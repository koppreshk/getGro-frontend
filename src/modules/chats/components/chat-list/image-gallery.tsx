import { Box } from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

type ImageGalleryProps = {
  urls: string[];
  selected: string | null; // currently selected URL
  onChange: (url: string | null) => void; // notify parent of change
};

export const ImageGallery = ({
  urls,
  selected,
  onChange,
}: ImageGalleryProps) => {
  const handleSelect = (url: string) => {
    onChange(selected === url ? null : url); // deselect if same clicked
  };

  return (
    <ImageList
      sx={{
        width: 'calc(100% - 16px)',
        maxWidth: 600,
        padding: '8px',
        overflowY: 'unset',
      }}
      cols={3}
      gap={8}
    >
      {urls.map((url, idx) => {
        const isSelected = url === selected;

        return (
          <ImageListItem
            key={url}
            onClick={() => handleSelect(url)}
            sx={{
              cursor: 'pointer',
              borderRadius: 2,
              overflow: 'hidden',
              position: 'relative',
              outline: isSelected ? '3px solid #1976d2' : 'none',
            }}
          >
            <img
              src={`${url}?w=248&fit=crop&auto=format`}
              srcSet={`${url}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={`Preview ${idx}`}
              loading="lazy"
              style={{
                borderRadius: 8,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />

            {/* Selection overlay */}
            {isSelected && (
              <Box
                sx={{
                  position: 'absolute',
                  top: 4,
                  right: 4,
                  bgcolor: 'rgba(255,255,255,0.7)',
                  borderRadius: '50%',
                }}
              ></Box>
            )}
          </ImageListItem>
        );
      })}
    </ImageList>
  );
};
