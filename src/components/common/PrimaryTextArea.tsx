function PrimaryTextArea({
  title = null,
  note = null,
  className = "",
  classNameTextArea = "",
  placeholder = "",
  onChange = undefined,
  id = "",
  ...props
}) {
  return (
    <div className={`form-group ${className}`}>
      {title && <div className="mb-2 text-sm text-white">{title}</div>}
      {note && <div className="mb-2 text-sm font-light text-gray">{note}</div>}
      <textarea
        {...props}
        onChange={onChange}
        className={`w-full h-full bg-transparent rounded-lg border text-base md:text-sm px-4 py-3 smooth-transform outline-none  border-secondary text-white focus:border-primary hover:border-primary smooth-transform ${classNameTextArea}`}
        // name="input-requirement"
        id={id}
        cols={30}
        rows={10}
        placeholder={placeholder}
      ></textarea>
      <span className="form-message"></span>
    </div>
  );
}

export default PrimaryTextArea;
