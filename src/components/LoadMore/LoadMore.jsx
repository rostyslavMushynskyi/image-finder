import Button from "@mui/material/Button";

function LoadMore({ onLoadMore }) {
  return (
    <div>
      <Button variant="contained" onClick={onLoadMore}>
        Load More
      </Button>
    </div>
  );
}
export default LoadMore;
