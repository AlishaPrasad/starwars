interface HeaderProps {
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  setSortField: React.Dispatch<React.SetStateAction<string>>;
}

export const Header = ({ setSearchText, setSortField }: HeaderProps) => {
  return (
    <div className="p1 background-grey flex">
      <div className="p1">
        <label htmlFor="sort" className="p0_5">
          Sort by:
        </label>
        <select
          onChange={(e) => {
            console.log(e.target.value);
            setSortField(e.target.value);
          }}
          name="sort_by"
          id="sort_by"
          className="p0_5"
        >
          <option value="year">Year</option>
          <option value="episode">Episode</option>
          <option value="rating">Rating</option>
        </select>
      </div>
      <div className="p1">
        <input
          type="text"
          placeholder="Type to search.."
          id="searchText"
          onChange={(e) => setSearchText(e.target.value)}
          className="p0_5"
          size={200}
        />
      </div>
    </div>
  );
};
