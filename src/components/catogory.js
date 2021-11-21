import '../App.css';
import React, { Component } from 'react';
import Analyze from './analyze';

class Catogory extends Component {
    state={
        catogories:[],
        products:[],
        counts:[],
        loading:true,
        selectCatogory:'xx',
        selectProduct:'xx',
        char:{
            id:0,
            title:'',
            category:'',
            description:'',
            image:'',
            price:0,
            rating:{
                count:0,
                rate:0
            }
        }
    };
    async componentDidMount() {
        const url = "https://fakestoreapi.com/products/categories";
        const url1 = "https://fakestoreapi.com/products"
        const response = await fetch(url);
        const response1 = await fetch(url1);
        const data = await response.json();
        const data1 = await response1.json();
        this.setState({catogories:data,products:data1,loading:false});
        var count=[]
        for(var x in data){
            fetch('https://fakestoreapi.com/products/category/'+data[x])
            .then(res=>res.json())
            .then(json=>{
                count.push(json.length)
                this.setState({counts:count})
            });
        }
      }
      handleChangecatogory=(event)=> {
        this.setState({loading:true});
        if(event.target.value === 'All' || event.target.value === 'Select Catogory'){
            fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(json=>{
                this.setState({products:json,loading:false});
            });
        }
        else{
            fetch('https://fakestoreapi.com/products/category/'+event.target.value)
            .then(res=>res.json())
            .then(json=>{
                this.setState({products:json,loading:false});
            });
        }
      }
      handleChangeproduct = (event) => {
        this.setState({loading:true});
        if(event.target.value === 'All' || event.target.value === 'Select Product'){
            fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(json=>{
                this.setState({products:json,loading:false});
            });
        }
        else{
            fetch('https://fakestoreapi.com/products/'+event.target.value)
        .then((response) => response.json())
        .then(booksList => {
            const list1=[]
            list1.push(booksList)
            this.setState({ products: list1 ,loading:false});
        });
        }
        
    }
    viewProduct=(i)=>{
        this.setState({char:this.state.products[i]})
    }
    render(){
        if (this.state.loading) {
            return (
                <div className="text-center pt-5 pb-5">
                    <div className="spinner-border text-primary"></div>
                    <h6  className="font-weight-bold" >Please wait while fetching the data</h6>
                </div>
            )
        }
        if (this.state.catogories.length === 0 || this.state.catogories.products === 0) {
            return (
                <div className="text-center pt-5 pb-5">
                    {/* <div className="spinner-border text-primary"></div> */}
                    <h6  className="font-weight-bold" >Somthing Went wrong. reload the page</h6>
                </div>
            )
        }
        return(
            <div id="products" className="container-fluid">
                <div className="d-lg-flex justify-content-between ">
                    <div className="heading">
                        <h1>Products</h1>
                    </div>
                    <div>
                        <div className="form-group d-md-flex">
                            {/* <label for="sel1">Select list (select one):</label> */}
                            <select className="form-control mr-4 mb-3" id="sel1" name="sellist1" onChange={this.handleChangecatogory}>
                                <option>Select Catogory</option>
                                <option value='All'>All</option>
                                {this.state.catogories.map((person,index) => (
                                    <option value={person} key={index}>{person}</option>
                                ))}
                            </select>
                            <select className="form-control text-trunkcate" id="sel2" name="sellist2" onChange={this.handleChangeproduct}>
                                <option>Select Product</option>
                                <option value='All'>All</option>
                                {this.state.products.map((pro,index) => (
                                    <option className="sel1" value={pro.id} key={index} title={pro.title}>{pro.title.slice(0,30)}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="row mb-4 cards">
                        {this.state.products.map((product,index) => (
                            <div key={index} className="col-sm-4 col-md-6 col-lg-3 d-flex align-items-stretch">
                                <div className="card flex-fill hover-card mb-3">
                                    <div className="card-img-container" height="100">
                                        <img className="card-img-top h-100" src={product.image} alt="pro" />
                                    </div>
                                    <div className="card-body shadow">
                                    <span className="badge badge-pill badge-info mb-2">{product.category}</span>
                                        <h5 className="card-title text-truncate mb-1" title={product.title}>
                                            {product.title}
                                        </h5>
                                        <div className="font-weight-light" title={product.catogory}>
                                            {product.catogory}
                                        </div>
                                        <div className="description mt-4 mb-4" title={product.description}>
                                            <p>{product.description}</p>
                                        </div>
                                        <div className="row ml-0 mr-0">
                                            <div className="col pl-0">
                                                <h6>Price</h6>
                                            </div>
                                            <div className="col pl-0 text-right">
                                                <p>${product.price}</p>
                                            </div>
                                        </div>
                                        <h4 className="mb-3">Rating</h4>
                                        <div className="row ml-0 mr-0">
                                            <div className="col pl-0">
                                                <h6>Count</h6>
                                                <h6>Rate</h6>
                                            </div>
                                            <div className="col pl-0 text-right">
                                                <p className="mb-2">{product.rating.count}</p>
                                                <p >{product.rating.rate}</p>
                                            </div>
                                        </div>
                                        <button type="button" className="btn btn-info float-right" data-toggle="modal" data-target="#myModal" onClick={() => this.viewProduct(index)}>
                                            View
                                        </button>
                                        <div className="modal fade" data-bs-backdrop="static" id="myModal" aria-labelledby="myModel" aria-hidden="true">
                                            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg pr-0">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h4 className="modal-title" id="exampleModalLabel"><b>{this.state.char.title}</b></h4><br/>
                                                        <span></span>
                                                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                                                    </div>
                                                    <div className="modal-body">
                                                        <div className="row ml-0 mr-0">
                                                            <div className="col-sm-6">
                                                                <div className="card-img-container">
                                                                    <img className="card-img-top " width="100%" height="330" alt="Charachter" src={this.state.char.image}/>
                                                                </div> 
                                                            </div>
                                                            <div className="col-sm-6">
                                                                {/* <div className="row ml-0 mr-0">
                                                                    <h3 className="modal-title mb-3" id="exampleModalLabel"><b>{this.state.char.title}</b></h3>
                                                                </div> */}
                                                                <div className="row ml-0 mr-0 model-des">
                                                                    {/* <h6 className="mb-0"><b>Born</b></h6>  */}
                                                                    <em>{this.state.char.description}</em>
                                                                </div>
                                                                <div className="row ml-0 mr-0 mt-3">
                                                                    <div className="col-sm-6 pl-0">
                                                                        <h6><b>Category</b></h6>
                                                                    </div>
                                                                    <div className="col-sm-6 pl-0">
                                                                        <p>{this.state.char.category}</p>
                                                                    </div>
                                                                </div>
                                                                <div className="row ml-0 mr-0">
                                                                    <div className="col-sm pl-0">
                                                                        <h6><b>Price</b></h6>
                                                                    </div>
                                                                    <div className="col-sm pl-0">
                                                                        <p>${this.state.char.price}</p>
                                                                    </div>
                                                                </div>
                                                                <h6 className="mb-0"><b>Rating</b></h6> 
                                                                <div className="row ml-0 mr-0 mt-3">
                                                                    
                                                                    <div className="col-sm pl-0">
                                                                        <h6>Count</h6>
                                                                       
                                                                    </div>
                                                                    <div className="col-sm pl-0">
                                                                        <p className="mb-0">{product.rating.count}</p>
                                                                        
                                                                    </div>
                                                                </div>
                                                                <div className="row ml-0 mr-0 mt-3">
                                                                    
                                                                    <div className="col-sm pl-0">
                                                                        
                                                                        <h6>Rate</h6>
                                                                    </div>
                                                                    <div className="col-sm pl-0">
                                                                        
                                                                        <p>{product.rating.rate}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>        
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <button type="button" id="analyse" data-toggle="modal" data-target="#pie" className="btn btn-info">Analyze</button>
                <div className="modal fade" id="pie">
                    <div className="modal-dialog modal-dialog-centered pr-0">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Analyze</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <Analyze counts={this.state.counts} catogory={this.state.catogories}></Analyze>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                            
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}
export default Catogory;