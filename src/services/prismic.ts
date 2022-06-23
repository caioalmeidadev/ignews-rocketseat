import Prismic from '@prismicio/client';


export function getPrismicClient(req?: unknown) {
    const prismic = Prismic.client(
        'https://ignewsalmeidacaio.prismic.io/api/v2', {
            req,
            accessToken: process.env.PRISMIC_TOKEN
        }
    );

    return prismic;
}