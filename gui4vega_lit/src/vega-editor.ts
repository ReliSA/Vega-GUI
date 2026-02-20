import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";
import * as vega from "vega";
import { EditorView, basicSetup } from "codemirror";
import { json } from "@codemirror/lang-json";
import defaultSpec from "../../json/default-spec.json";

@customElement("vega-editor")
export class VegaEditor extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
    .container {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
    .controls {
      padding: 10px;
      border-bottom: 1px solid #ccc;
      flex-shrink: 0;
    }
    button {
      padding: 8px 16px;
      cursor: pointer;
      margin-right: 10px;
    }
    input[type="file"] {
      display: none;
    }
    .content {
      display: flex;
      flex: 1;
      overflow: hidden;
      min-height: 0;
    }
    .editor,
    .viz {
      flex: 1;
      padding: 10px;
      box-sizing: border-box;
      overflow: auto;
      min-width: 0;
    }
    .editor {
      border-right: 1px solid #ccc;
      display: flex;
      flex-direction: column;
    }
    #editor {
      flex: 1;
      overflow: auto;
      min-height: 0;
    }
    .viz {
      overflow: auto;
    }
    .viz.hidden {
      display: none;
    }
    #vega-view {
      min-width: fit-content;
      min-height: fit-content;
    }
  `;

  @state()
  private showVisualization = false;

  private editorView?: EditorView;

  firstUpdated() {
    const initialSpec = JSON.stringify(defaultSpec, null, 2);

    this.editorView = new EditorView({
      doc: initialSpec,
      extensions: [
        basicSetup,
        json(),
        EditorView.updateListener.of((update) => {
          if (update.docChanged && this.showVisualization) {
            this.renderVega(update.state.doc.toString());
          }
        }),
      ],
      parent: this.renderRoot.querySelector("#editor")!,
    });
  }

  async toggleVisualization() {
    this.showVisualization = !this.showVisualization;

    if (this.showVisualization && this.editorView) {
      // Wait for DOM to update before rendering
      await this.updateComplete;
      this.renderVega(this.editorView.state.doc.toString());
    }
  }

  handleFileSelect() {
    const input = this.renderRoot.querySelector(
      "#file-input",
    ) as HTMLInputElement;
    input?.click();
  }

  async handleFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) return;

    try {
      const text = await file.text();
      const spec = JSON.parse(text);

      // Update editor content
      if (this.editorView) {
        this.editorView.dispatch({
          changes: {
            from: 0,
            to: this.editorView.state.doc.length,
            insert: JSON.stringify(spec, null, 2),
          },
        });

        // If visualization is shown, update it
        if (this.showVisualization) {
          await this.updateComplete;
          this.renderVega(JSON.stringify(spec));
        }
      }
    } catch (err) {
      console.error("Error loading file:", err);
      alert("Error loading file: " + (err as Error).message);
    }

    // Reset input so the same file can be loaded again
    input.value = "";
  }

  renderVega(specText: string) {
    const container = this.renderRoot.querySelector(
      "#vega-view",
    ) as HTMLElement;
    if (!container) return;

    try {
      // Clear previous visualization
      container.innerHTML = "";

      const spec = JSON.parse(specText);
      const view = new vega.View(vega.parse(spec), {
        renderer: "canvas",
        container: container,
        hover: true,
      });
      view.runAsync();
    } catch (err) {
      console.warn("Invalid Vega spec", err);
    }
  }

  render() {
    return html`
      <div class="container">
        <div class="controls">
          <button @click=${this.handleFileSelect}>Load JSON File</button>
          <button @click=${this.toggleVisualization}>
            ${this.showVisualization ? "Hide" : "Show"} Visualization
          </button>
          <input
            type="file"
            id="file-input"
            accept=".json"
            @change=${this.handleFileChange}
          />
        </div>
        <div class="content">
          <div class="editor" id="editor"></div>
          <div class="viz ${this.showVisualization ? "" : "hidden"}">
            <div id="vega-view"></div>
          </div>
        </div>
      </div>
    `;
  }
}
