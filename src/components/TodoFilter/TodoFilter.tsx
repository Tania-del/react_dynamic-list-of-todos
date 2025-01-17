type TodoFilterType = {
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleTitleChange: ({ target }: React.ChangeEvent<HTMLInputElement>) => void;
  todoTitle: string;
  handleClear: () => void;
};

export const TodoFilter: React.FC<TodoFilterType> = ({
  handleChange,
  handleTitleChange,
  todoTitle,
  handleClear,

}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select onChange={handleChange} data-cy="statusSelect">
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
      </span>
    </p>

    <p className="control is-expanded has-icons-left has-icons-right">
      <input
        value={todoTitle}
        onChange={handleTitleChange}
        data-cy="searchInput"
        type="text"
        className="input"
        placeholder="Search..."
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        {todoTitle && (
          // eslint-disable-next-line jsx-a11y/control-has-associated-label
          <button
            onClick={() => handleClear()}
            data-cy="clearSearchButton"
            type="button"
            className="delete"
          />
        )}
      </span>
    </p>
  </form>
);
