import { Table } from "antd";
import { inject, observer } from "mobx-react";
import { flow, getEnv, types } from "mobx-state-tree";
import Papa from "papaparse";

import { errorBuilder } from "../../core/DataValidator/ConfigValidator";
import Registry from "../../core/Registry";
import { AnnotationMixin } from "../../mixins/AnnotationMixin";
import ProcessAttrsMixin from "../../mixins/ProcessAttrs";
import Base from "./Base";
import { parseTypeAndOption, parseValue } from "../../utils/data";

import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import js from "react-syntax-highlighter/dist/esm/languages/hljs/javascript";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

SyntaxHighlighter.registerLanguage("javascript", js);

/**
 * The `Table` tag is used to display object keys and values in a table.
 * @example
 * <!-- Basic labeling configuration for text in a table -->
 * <View>
 *   <Table name="text-1" value="$text"></Table>
 * </View>
 * @name JsonText
 * @meta_title JsonText Tag to Display Json-formatted Text
 * @meta_description Customize Label Studio by displaying json-formatted text in tasks for machine learning and data science projects.
 * @param {string} value Data field value containing json-formatted text
 */
const Model = types
  .model({
    type: "jsontext",
    value: types.maybeNull(types.string),
    _value: types.frozen([]),
  })
  .views((self) => ({
    get dataSource() {
      return self._value;
    },
  }))
  .actions((self) => ({
    updateValue: flow(function* (store) {
      let originData = parseValue(self.value, store.task.dataObj);

      self._value = typeof originData === "string" ? JSON.parse(originData) : originData;
    }),
  }));

const JsonTextModel = types.compose("JsonTextModel", Base, ProcessAttrsMixin, AnnotationMixin, Model);

const HtxJsonText = inject("store")(
  observer(({ item }) => {
    return (
      <SyntaxHighlighter language="javascript" style={docco} className="json-text">
        {JSON.stringify(item.dataSource, null, 2)}
      </SyntaxHighlighter>
    );
  }),
);

Registry.addTag("jsontext", JsonTextModel, HtxJsonText);
Registry.addObjectType(JsonTextModel);

export { HtxJsonText, JsonTextModel };
