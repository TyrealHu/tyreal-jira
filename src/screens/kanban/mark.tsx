export const Mark = ({ name, keyword }: { name: string; keyword: string }) => {
  if (!keyword) {
    return <div>{name}</div>;
  }
  const arr = name.split(keyword);
  return (
    <div>
      {arr.map((item, index) => (
        <span key={index}>
          {item}
          {index >= arr.length - 1 ? null : (
            <span style={{ color: "#258AFD" }}>{keyword}</span>
          )}
        </span>
      ))}
    </div>
  );
};
