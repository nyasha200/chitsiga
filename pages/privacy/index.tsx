import Container from '@/components/ui-components/container';
import RichText from '@/components/ui-components/rich-text';
import apolloClient from '@/lib/apolloclient';
import { GET_PAGE_DATA } from '@/lib/queries';



const Privacy = ({ item }: { item: { title: string; slug: string; details: JSON } | null }) => {
    return (
        <div className="flex justify-center min-h-[78vh]">
            <Container className="w-full md:w-2/3">
                <RichText content={item?.details} />
            </Container>
        </div>
    );
};

export default Privacy;

export async function getServerSideProps() {
    try {
        const { data } = await apolloClient.query({
            query: GET_PAGE_DATA,
            variables: { slug: 'privacy' },
        });

        const fetchedItem = data.pageCollection.items[0] || null;

        return {
            props: {
                item: fetchedItem,
            },
        };
    } catch (error) {
        console.error('Error fetching page data:', error);
        return {
            props: {
                item: null,
            },
        };
    }
}