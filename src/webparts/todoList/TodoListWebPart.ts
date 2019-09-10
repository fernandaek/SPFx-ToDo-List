import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneCheckbox,
  PropertyPaneSlider
} from '@microsoft/sp-webpart-base';

import * as strings from 'TodoListWebPartStrings';
import TodoList from './components/TodoList';
import { ITodoListProps } from './components/ITodoListProps';
// import {
//   SPHttpClient,
//   SPHttpClientResponse,
//   ISPHttpClientOptions   
// } from '@microsoft/sp-http';



export interface ITodoListWebPartProps {
  description: string;
  ShowCompletedTasks: boolean;
  NumberOfTasks: number;
}

export interface ISPLists{
  value: ISPList[];
}

export interface ISPList{
  Title: string;
  Id: string;
}


export default class TodoListWebPart extends BaseClientSideWebPart<ITodoListWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ITodoListProps > = React.createElement(
      TodoList,
      {
        description: this.properties.description, //This betyder den här webdelen hella classen
        ShowCompletedTasks: this.properties.ShowCompletedTasks,
        NumberOfTasks: this.properties.NumberOfTasks,
        siteurl: this.context.pageContext.web.absoluteUrl

      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel,
                })
              ]
            },
            {
              groupName: "Group One",
              groupFields: [
                PropertyPaneCheckbox('ShowCompletedTasks', {
                  text: 'Yes/No'
                })
              ]
            },
            {
              groupName: "Group Two",
              groupFields: [
                PropertyPaneSlider('NumberOfTasks', {
                  label: 'Number of tasks', min:1, max:10, step: 1
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
