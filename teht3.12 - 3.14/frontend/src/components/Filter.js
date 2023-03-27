const Filter = (props) => {
    return (
        <div>
            filter shown with <input
                type="search"
                value={props.filterValue}
                onChange={props.handleFilterChange}
            />
        </div>
    )
}

export default Filter