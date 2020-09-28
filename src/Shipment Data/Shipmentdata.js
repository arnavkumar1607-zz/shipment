import React from 'react';
import ShipmentTable from '../Shipment Table/ShipmentTable';
import * as _ from 'lodash';

class Shipment extends React.Component {

    allShipmentdata = [];
    filteredData = [];
    pageNo;
    pageSize;
    constructor(props) {
        super(props);
        this.state = {
            shipment_data: []
        }
    }

    componentDidMount() {
        this.getShipmentData();
    }

    componentDidUpdate() {

    }

    getShipmentData() {
        fetch('http://localhost:3000/shipments')
            .then(res => res.json())
            .then(
                (result) => {
                    this.allShipmentdata = result;
                    this.filteredData = result;
                    this.setState({ shipment_data: result });
                }, (error) => {
                    console.log(error);
                }
            )
    }

    manipulatePage(type) {
        if (type === 'size') {
            if (this.refs.pageSize.value) {
                let chunkedArray = this.filteredData = _.chunk(this.allShipmentdata, this.refs.pageSize.value);
                this.setState({ shipment_data: chunkedArray[0] })
            } else {
                alert('Please Enter Page Size...');
            }

        } else if (type === 'sort') {
            if (this.refs.sort_select.value) {
                let sortedData = this.filteredData = _.sortBy(this.state.shipment_data, this.refs.sort_select.value.toLowerCase());
                this.setState({ shipment_data: sortedData });
            } else {
                alert('Please Select Sort Type...');
            }
        } else if (type === 'search') {
            if (this.refs.search_data.value) {
                let searchData = this.state.shipment_data.map((m) => {
                    if (!_.isEmpty(m) && (m.id.toLowerCase().indexOf(this.refs.search_data.value.toLowerCase()) > -1 || m.name.toLowerCase().indexOf(this.refs.search_data.value.toLowerCase()) > -1 || m.mode.toLowerCase().indexOf(this.refs.search_data.value.toLowerCase()) > -1 || m.type.toLowerCase().indexOf(this.refs.search_data.value.toLowerCase()) > -1 || m.origin.toLowerCase().indexOf(this.refs.search_data.value.toLowerCase()) > -1 || m.destination.toLowerCase().indexOf(this.refs.search_data.value.toLowerCase()) > -1))
                        return m;
                    else
                        return null;
                })
                this.setState({ shipment_data: searchData });
            } else {
                alert('Please Enter Keyword to Search...');
            }
        } else if (type === 'reset') {
            this.refs.pageNo.value = '';
            this.refs.pageSize.value = '';
            this.refs.search_data.value = '';
            this.refs.sort_select.value = 'ID';
            this.filteredData = this.allShipmentdata;
            this.setState({ shipment_data: this.allShipmentdata });
        } else {
            if (this.refs.pageNo.value) {
                let maxPageSize = Math.ceil(this.filteredData.length);
                if (this.refs.pageNo.value <= maxPageSize) {
                    this.setState({ shipment_data: this.filteredData[this.refs.pageNo.value - 1] })
                }
            }
            else {
                alert('Please enter Page No....');
            }
        }
    }

    render() {
        if (!this.state.shipment_data.length)
            return null;
        else
            return (
                <div className="shipmentData">
                    <p>Shipment Data...!!</p>
                    <div className="controls">
                        <div className="firstControl">
                            <input type="textbox" placeholder="Enter Page No" ref="pageNo" />
                            <button type="submit" value="submit" onClick={e => this.manipulatePage('no')}>Go to Page</button>
                            <input type="textbox" placeholder="Enter Page Size" ref="pageSize" />
                            <button type="submit" value="submit" onClick={e => this.manipulatePage('size')}>Set Page Size</button>
                        </div>
                        <div className="secondControl">
                            <input type="textbox" name="search" placeholder="Enter data to search" ref="search_data"></input>
                            <button type="submit" value="submit" onClick={e => this.manipulatePage('search')} >Search</button>
                            <select name="sort_select" id="sort_select" ref="sort_select">
                                <option value="id">ID</option>
                                <option value="name">Name</option>
                                <option value="mode">Mode</option>
                                <option value="type">Type</option>
                                <option value="origin">Origin</option>
                                <option value="destination">Destination</option>
                            </select>
                            <button type="submit" value="submit" onClick={e => this.manipulatePage('sort')} >Sort By</button>
                        </div>
                    <button className="reset" type="submit" value="submit" onClick={e => this.manipulatePage('reset')}>Reset Data</button>
                    </div>
                    <ShipmentTable ship_data={this.state.shipment_data}></ShipmentTable>
                </div>
            )
    }
}

export default Shipment;