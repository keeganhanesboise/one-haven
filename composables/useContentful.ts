import { type ContentfulClientApi, createClient } from 'contentful';
import { useRuntimeConfig } from '#app';

export const useContentful = (): ContentfulClientApi<any> => {
  const config = useRuntimeConfig();

  const spaceId = config.public.contentfulSpaceId as string;
  const accessToken = config.public.contentfulAccessToken as string;
  const previewMode = config.public.contentfulPreviewMode === 'true';

  // Ensure required environment variables are set
  if (!spaceId || !accessToken) {
    throw new Error(
      'Contentful configuration is missing required environment variables'
    );
  }

  return createClient({
    space: spaceId,
    accessToken: accessToken,
    host: previewMode ? 'preview.contentful.com' : undefined
  });
};
