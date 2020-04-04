import React from 'react';
import { TagsLegendContainer, TagLegendItemContainer, TagCode, ColorDot } from './TagsLegend.style';
import { TagType } from 'redux/Tag';

interface propTypes {
  tags: TagType[];
}

const TagsLegend: React.FunctionComponent<propTypes> = props => {
  return (
    <TagsLegendContainer>
      {props.tags.map(tag => (
        <TagLegendItemContainer key={tag.code}>
          <ColorDot color={tag.color} />
          <TagCode>{tag.code}</TagCode>
        </TagLegendItemContainer>
      ))}
    </TagsLegendContainer>
  );
};

export default TagsLegend;
