import React, { useEffect, useState } from "react";
import { Source } from "./Source";
import { query } from "../api/index";

const Content = () => {
  useEffect(() => {
    query({
      query: "query project(id: $projectID)",
      variables: { projectID: "project-1" },
    }).then((response) => {
      console.log(response.data.data);
    });
  });
  return (
    <div>
      <Source />
    </div>
  );
};

export class Project extends React.Component {
  render() {
    return (
      <div>
        <h1>Project</h1>
        <Content />
      </div>
    );
  }
}
