import type { Schema, Struct } from '@strapi/strapi';

export interface CodeBlockCodeBlock extends Struct.ComponentSchema {
  collectionName: 'components_code_block_code_blocks';
  info: {
    displayName: 'codeBlock';
  };
  attributes: {
    code: Schema.Attribute.Text;
    filename: Schema.Attribute.String;
    language: Schema.Attribute.Enumeration<
      [
        'typescript',
        'javascript',
        'html',
        'css',
        'java',
        'sql',
        'xml',
        'json',
        'yml',
      ]
    >;
  };
}

export interface ContentParagraph extends Struct.ComponentSchema {
  collectionName: 'components_content_paragraphs';
  info: {
    displayName: 'paragraph';
  };
  attributes: {
    text: Schema.Attribute.RichText;
  };
}

export interface ImageBlockImageBlock extends Struct.ComponentSchema {
  collectionName: 'components_image_block_image_blocks';
  info: {
    displayName: 'Image Block';
  };
  attributes: {
    alt: Schema.Attribute.Text;
    caption: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'code-block.code-block': CodeBlockCodeBlock;
      'content.paragraph': ContentParagraph;
      'image-block.image-block': ImageBlockImageBlock;
    }
  }
}
