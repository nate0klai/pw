import {filteredUserList} from "../store/transactions/actions";
import React, {useState} from "react";
import {Autocomplete} from "@material-ui/lab";
import {TextField} from "@material-ui/core";
import {connect} from "react-redux";
import {UserSimpleInfo} from "../store/main/types";
import {change} from "redux-form";
import {RootState} from "../types";
import {ThunkDispatch} from "redux-thunk";
import {TransactionsTypes} from "../store/transactions/types";

interface MapDispatchPropsType {
    changeFormValue: (val: string | null) => void
}
const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, any, TransactionsTypes>): MapDispatchPropsType => ({
    changeFormValue: (val: string | null) => dispatch(change('createTransactionForm', 'recipientName', val))
});

const UsersList: React.FC<MapDispatchPropsType> = ({changeFormValue}) => {
    const [list, setList] = useState<UserSimpleInfo[]>([])

    const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = event.target;
        const flist = value.length > 0 ? (await filteredUserList(value)) : [];
        setList(flist);
    }

    const onChangeValue = (event: any, newValue: string) => {
        changeFormValue(newValue)
    }

    return (
        <div style={{ width: 230 }}>
            <Autocomplete
                autoComplete
                id="users-list"
                disableClearable
                options={list}
                getOptionLabel={(option) => option.name}
                onInputChange={onChangeValue}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Search input"
                        margin="normal"
                        variant="outlined"
                        onInput={handleSearch}
                        InputProps={{ ...params.InputProps, type: 'search' }}
                    />
                )}
            />
        </div>
    )
}

export default connect(null, mapDispatchToProps)(UsersList)