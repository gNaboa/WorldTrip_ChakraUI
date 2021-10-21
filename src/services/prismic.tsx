import Prismic from '@prismicio/client'

import { DefaultClient } from '@prismicio/client/types/client';

export function getPrismicClient(req?: unknown): DefaultClient {
  const prismic = Prismic.client('https://worldtripapp.cdn.prismic.io/api/v2'
, {
    req,
     accessToken: process.env.NEXT_PUBLIC_PRISMIC_ACESS_TOKEN
  });

  return prismic;
}
