export default function AccountAvatar({hash}: {hash: string}) {
  const iconRating = 'PG';
  const defaultIcon = 'identicon';
  const iconSize = 24;
  const url = `https://www.gravatar.com/avatar/${hash}?rating=${iconRating}&size=${iconSize}&default=${defaultIcon}`;
  const handleImageError: React.ReactEventHandler<HTMLImageElement> = (event) => {
    const img = event.target as HTMLImageElement;
    if (img) {
      img.src = `https://www.gravatar.com/avatar/${hash}?rating=${iconRating}&size=${iconSize}&default=${defaultIcon}`;
    }
  };

  return <img className='gravatar' src={url} onError={handleImageError} />;
}
