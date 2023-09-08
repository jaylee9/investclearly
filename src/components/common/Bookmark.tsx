import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { useBookmarkStyles } from './styles';

interface BookmarkProps {
  addBookmark?: () => void;
  deleteBookmark?: () => void;
  isInBookmarks?: boolean;
}

const Bookmark = ({
  isInBookmarks,
  addBookmark,
  deleteBookmark,
}: BookmarkProps) => {
  const classes = useBookmarkStyles();

  return isInBookmarks ? (
    <BookmarkIcon sx={classes.filledBookmarkIcon} onClick={deleteBookmark} />
  ) : (
    <BookmarkBorderIcon sx={classes.bookmarkIcon} onClick={addBookmark} />
  );
};

export default Bookmark;
