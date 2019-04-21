import React, { Component } from "react";
import "./App.css";
import axios from 'axios';

const apiEndPoint = 'http://jsonplaceholder.typicode.com/posts';

class App extends Component {

  state = {
    posts: []
  };

  handleAdd = async () => {
    console.log("Add");
    const obj = {title : 'This is new title' }
    const {data:post} =  await axios.post(apiEndPoint, obj);
    console.log(post)
    const posts = [post, ...this.state.posts];
    this.setState({posts})
  };

  handleUpdate = async post => {
    //console.log("Update", post);

   post.title = 'This is Updated title';

    
    try{
      await axios.put(apiEndPoint+'/999', post)
      const posts = [...this.state.posts];
      const index = posts.indexOf(post)
      posts[index] = {...post}
      this.setState({posts})
    
    }catch(ex){
      console.log(ex.request)
      console.log(ex.response)
    }
    
  };

  handleDelete = async post => {
  
    try{
      await axios.delete(apiEndPoint + '/999');
      const posts = this.state.posts.filter(p=>p.id !== post.id)
      this.setState({posts})  
    }catch(ex){
      alert('something went wrong...')
      console.log(ex.response)
    }
  };

  componentDidMount = async ()=>{

    try{
      const promise =  axios.get(apiEndPoint)
      const {data:posts} = await promise; 
      this.setState({ posts })
    }catch(error){
      alert('something went wrong...')
    }
      //console.log(promise)
      
      // axios.get(apiEndPoint)      
      //   .then((response)=>{
      //     //console.log(response.data)
      //     this.setState({
      //       posts : response.data
      //     })
      //   })
      //   .catch((error)=>{
      //       console.log(error)
      //   })
      
  }

  render() {
  //  console.log('rendering the content....')
    return (
      <React.Fragment>
        
    
        <button className="btn btn-primary" onClick={this.handleAdd}>
          Add
        </button>
        
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map(post => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => this.handleUpdate(post)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default App;