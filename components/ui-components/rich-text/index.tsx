import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import Text from '../text';
import Image from 'next/image';

const customMarkdownOptions = (content: any, linkClassName: string, customLinkEventHandler: () => void) => {
    const assetMap = new Map();

    if (content.links && content.links.assets) {
        for (const asset of content.links.assets.block) {
            assetMap.set(asset.sys.id, asset);
        }
    }

    return {
        renderNode: {
            [BLOCKS.PARAGRAPH]: (node: any, children: any) => (
                <Text as="p" variant="body2" additional="whitespace-pre-wrap my-4 text-justify">
                    {children}
                </Text>
            ),
            [BLOCKS.HEADING_1]: (node: any, children: any) => (
                <Text as="h1" variant="title1" additional="mb-6">
                    {children}
                </Text>
            ),
            [BLOCKS.HEADING_2]: (node: any, children: any) => (
                <Text as="h2" variant="title2" additional="mb-6">
                    {children}
                </Text>
            ),
            [BLOCKS.HEADING_3]: (node: any, children: any) => (
                <Text as="h3" variant="title3" additional="mb-6">
                    {children}
                </Text>
            ),
            [BLOCKS.HEADING_4]: (node: any, children: any) => (
                <Text as="h4" variant="title4" additional="mb-6">
                    {children}
                </Text>
            ),
            [BLOCKS.HEADING_5]: (node: any, children: any) => (
                <Text as="h5" variant="title5" additional="mb-6">
                    {children}
                </Text>
            ),
            [BLOCKS.HEADING_6]: (node: any, children: any) => (
                <Text as="h6" variant="title5" additional="mb-6">
                    {children}
                </Text>
            ),
            [INLINES.HYPERLINK]: (node: any, children: any) => (
                <a href={node.data.uri} className={linkClassName} onClick={customLinkEventHandler}>
                    {children}
                </a>
            ),
            [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
                const asset = assetMap.get(node.data.target.sys.id);
                if (asset) {
                    return (
                        <div className="mb-6 w-full flex justify-start items-start">
                            <Image
                                src={asset.url}
                                alt={asset.title || 'Image'}
                                width={asset.width || 600}
                                height={asset.height || 300}
                                className="object-contain !max-h-[540px] w-auto my-6"
                            />
                        </div>
                    );
                }
                return null;
            },
        },
    };
};

type Props = {
    content: any;
    linkClassName?: string;
    customLinkEventHandler?: () => void;
};

const RichText: React.FC<Props> = ({ content, linkClassName = '', customLinkEventHandler = () => { } }) => {
    return (
        <div className="richText">
            {content && (
                <Text as="div" variant="body2" additional='my-2'>
                    {documentToReactComponents(
                        content.json,
                        customMarkdownOptions(content, linkClassName, customLinkEventHandler)
                    )}
                </Text>
            )}
        </div>
    );
};

export default RichText;