import React from 'react';
import './ShipmentTable.scss';
class ShipmentTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ship_data: this.props.ship_data
        }
    }

    componentWillReceiveProps() {
        this.setState({ ship_data: this.props.ship_data });
    }

    componentDidMount() {

    }

    componentDidUpdate() {
        if (this.state.ship_data !== this.props.ship_data) {
            this.setState({ ship_data: this.props.ship_data });
        }
    }

    render() {
        if (!this.state.ship_data.length)
            return null;
        else {
            return (
                <>
                    <table key={'shipmentTable'}>
                        <tr key={'maintr'}>
                            <th key={'thid'}>ID</th>
                            <th key={'thname'}>Name</th>
                            <th key={'thmode'}>Mode</th>
                            <th key={'thtype'}>Type</th>
                            <th key={'thorigin'}>Origin</th>
                            <th key={'thdestination'}>Destination</th>
                        </tr>
                        {this.state.ship_data.map((d, index) => {
                            if (d !== undefined && d !== null) {
                                return (
                                    <tr key={index+'tr'}>
                                        <td key={index+'tdid'}>{d.id}</td>
                                        <td key={index+'tdname'}>{d.name}</td>
                                        <td key={index+'tdmode'}>{d.mode}</td>
                                        <td key={index+'tdtype'}>{d.type}</td>
                                        <td key={index+'tdorigin'}>{d.origin}</td>
                                        <td key={index+'tddestination'}>{d.destination}</td>
                                    </tr>
                                )
                            } else {
                                return null;
                            }
                        })}
                    </table>
                </>
            )
        }
    }
}

export default ShipmentTable;