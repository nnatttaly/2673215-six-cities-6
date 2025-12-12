import { useAppDispatch, useAppSelector } from '@hooks/index';
import { changeFavoriteStatusAction } from '@store/api-actions';
import { getAuthorizationStatus } from '@store/user-process/selectors';
import { AuthorizationStatus, BOOKMARK_ICON_SIZE } from 'consts';
import { AppRoute } from 'consts';
import { useNavigate } from 'react-router-dom';

type BookmarkButtonProps = {
  offerId: string;
  isFavorite: boolean;
  variant: 'place-card' | 'offer';
};

function BookmarkButton({ offerId, isFavorite, variant }: BookmarkButtonProps): JSX.Element {
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(getAuthorizationStatus);
  const navigate = useNavigate();

  const handleClick = () => {
    if (authStatus !== AuthorizationStatus.Auth) {
      navigate(AppRoute.Login);
      return;
    }

    const newStatus = isFavorite ? 0 : 1;
    dispatch(changeFavoriteStatusAction({ offerId, status: newStatus }));
  };

  const size = BOOKMARK_ICON_SIZE[variant];

  return (
    <button
      className={`${variant}__bookmark-button ${isFavorite ? `${variant}__bookmark-button--active` : ''} button`}
      type="button"
      onClick={handleClick}
    >
      <svg
        className={`${variant}__bookmark-icon`}
        width={size.width}
        height={size.height}
      >
        <use xlinkHref="#icon-bookmark" />
      </svg>
      <span className="visually-hidden">
        {isFavorite ? 'In' : 'To'} bookmarks
      </span>
    </button>
  );
}

export default BookmarkButton;
