import React from 'react';
import {
  TagsLegendContainer,
  TagLegendItemContainer,
  TagCode,
  ColorDot,
  TagsLegendColumn,
} from './TagsLegend.style';
import { TagType } from 'redux/Tag';

interface propTypes {
  tags: TagType[];
}

const TagsLegend: React.FunctionComponent<propTypes> = props => {
  const tagsColumns = [props.tags.slice(0, 8), props.tags.slice(8, 16)];
  return (
    <TagsLegendContainer>
      {tagsColumns.map(tagColumn => (
        <TagsLegendColumn>
          {tagColumn.map(tag => (
            <TagLegendItemContainer key={tag.code}>
              <ColorDot color={tag.color} />
              <TagCode>{tag.code}</TagCode>
            </TagLegendItemContainer>
          ))}
        </TagsLegendColumn>
      ))}
    </TagsLegendContainer>
  );
};

export default TagsLegend;
