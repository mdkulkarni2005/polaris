import { StateEffect, StateField } from "@codemirror/state";
import {
  Decoration,
  DecorationSet,
  EditorView,
  ViewPlugin,
  ViewUpdate,
  WidgetType,
  keymap,
} from "@codemirror/view";
import { effect } from "zod/v3";

// StateEffect: A way to send "message" to update state.
// We define one effect type of setting the suggestion text.
const setSuggestionEffect = StateEffect.define<string | null>();

// StateFiled: Holds our suggestion state in the editor.
// - create(): Returns the initail value when the editor loads
// - update(): Called on every transaction (keystrke, etc) to potentially update the value
const suggestionState = StateField.define<string | null>({
  create() {
    return "// TODO: implement this";
  },
  update(value, transaction) {
    // Check each effect in this transaction
    // if we find our setSuggestionEffect, return its new value
    // otherwise, keep the current value unchanged
    for (const effect of transaction.effects) {
      if (effect.is(setSuggestionEffect)) {
        return effect.value;
      }
    }
    return value;
  },
});

// WidgetType: Creates custome DOM element to display in the editor.
// toDOM() is called by CodeMirror to create the actual HTML element.
class SuggestionWidget extends WidgetType {
    constructor(readonly text: string) {
        super()
    }
    toDOM() {
        const span = document.createElement("span")
        span.textContent = this.text
        span.style.opacity = "0.4" // Ghost text appearance
        span.style.pointerEvents = "none"
        return span;
    }
}

const renderPlugin = ViewPlugin.fromClass(
  class {
    decorations: DecorationSet;

    constructor(view: EditorView) {
      this.decorations = this.build(view);
    }

    update(update: ViewUpdate) {
      // Rebuild decorations if doc changed, cursor moved, or suggestion changed
      const suggestionChanged = update.transactions.some((transaction) =>
      {
        return transaction.effects.some((effect) => {
            return effect.is(setSuggestionEffect)
        })
      });

      // Rebuild decorations if doc changed, cursor moved, or suggestion changed
      const shouldRebuild = update.docChanged || update.selectionSet || suggestionChanged

      if(shouldRebuild) {
        this.decorations = this.build(update.view)
      }
    }

    build(view: EditorView) {
        // Get current suggestion from state
        const suggestion = view.state.field(suggestionState)
        if(!suggestion) {
            return Decoration.none
        }

        // Create a widget decoration at the cursor poistion
        const cursor = view.state.selection.main.head
        return Decoration.set([
            Decoration.widget({
                widget: new SuggestionWidget(suggestion),
                side: 1 // Render after cursor (side: 1), not before (side: -1)
            }) .range(cursor)
        ])
    }
  },
  { decorations: (plugin) => plugin.decorations } // Tell CodeMirror to use our decorations
);

export const suggestion = (fileName: string) => [
  suggestionState, // our state storeage
  renderPlugin, // Render the ghost text
];
