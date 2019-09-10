import * as React from 'react';
import styles from './TodoList.module.scss';
import { ITodoListProps } from './ITodoListProps';
import { escape } from '@microsoft/sp-lodash-subset';
import * as $ from 'jquery';

export interface ITodoListState{ 
  items:[ 
        { 
          "Title": "", 
          "Completed": "", 
          "DueDate":"", 
        }];
} 

export default class TodoList extends React.Component<ITodoListProps, ITodoListState> {

  public constructor(props: ITodoListProps, state: ITodoListState){ 
    super(props); 
    this.state = { 
      items: [ 
        { 
          "Title": "", 
          "Completed": "", 
          "DueDate":"", 
        } 
      ] 
    }; 
  } 

  public componentDidMount(){ 
    var reactHandler = this; 
    $.ajax({ 
        url: `https://alvocriativa.sharepoint.com/sites/FernandasCom/_api/web/lists/getbytitle('todo')/items`, 
        type: "GET", 
        headers:{'Accept': 'application/json; odata=verbose;'}, 
        success: (resultData) => { 
          console.log(resultData);
          console.log("COMPLETED: " + resultData.Completed);
          reactHandler.setState({ 
            items: resultData.d.results 
          }); 
        }, 
        error : (jqXHR, textStatus, errorThrown) => { 
        } 
    }); 
  } 

  public render(): React.ReactElement<ITodoListProps> {
    return ( 
 
      <div className={styles.panelStyle} >
        <br></br>
  
        <br></br>
        <div className={styles.tableCaptionStyle} > Retrieve SharePoint List </div>
        <br></br>
         <div className={styles.headerCaptionStyle} > ToDo Details</div>
        <div className={styles.tableStyle} >  
           
          <div className={styles.headerStyle} > 
            <div className={styles.CellStyle}>Title</div> 
            <div className={styles.CellStyle}>Completed</div> 
            <div className={styles.CellStyle}>DueDate</div> 
          </div> 
           
            {this.state.items.map((item,key) => { 
               
              return (<div className={styles.rowStyle} key={key}> 
                  <div className={styles.CellStyle}>{item.Title}</div> 
                  <div className={styles.CellStyle}>{item.Completed}</div> 
                   <div className={styles.CellStyle}>{item.DueDate}</div>         
                </div>); 
            })}                     
        </div> 
      </div> 
  ); 
  }
}
