import React from 'react';
import {
  TagsLegendContainer,
  TagLegendItemContainer,
  TagCode,
  ColorDot,
  TagsLegendColumn,
} from './TagsLegend.style';
import { TagLegendsPropsTypes } from './TagsLegend.type';

export const TagsLegend: React.FunctionComponent<TagLegendsPropsTypes> = props => {
  const tagsColumns = [props.tags.slice(0, 8), props.tags.slice(8, 16)];
  return (
    <TagsLegendContainer>
      {tagsColumns.map((tagColumn, index) => (
        <TagsLegendColumn key={`${index}-${tagColumn.length}`}>
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
