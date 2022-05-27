import React from "react";
import { Media } from "./Media";
import { Quote } from "./Quote";

export class Source extends React.Component {
  render() {
    return (
      <div>
        <h1>Source</h1>
        <Quote />
        <Media />
      </div>
    );
  }
}
