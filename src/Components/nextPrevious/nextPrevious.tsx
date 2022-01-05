import * as React from "react";
interface Props{
    clickPrevious : any;
    clickNext : any;
}
interface State{

}
export class NextPrevious extends React.Component<Props,State>{

    constructor(props : Props){
        super(props);
    }

    render(){
        return (
            <div>
                <button className="btn" style={{color:"white"}} onClick={this.props.clickPrevious}><i className="fa fa-caret-left"/></button>
                 Today 
                <button className="btn" style={{color:"white"}} onClick={this.props.clickNext}> <i className="fa fa-caret-right" aria-hidden="true"/></button>
            </div>
        )
        
        
    }
}