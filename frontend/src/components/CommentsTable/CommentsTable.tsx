import * as React from 'react';
import { AutoSizer, MultiGrid } from 'react-virtualized';
import styled from 'styled-components';
import { tableConfig, fixedColumnCount, RendererInputType } from './columnConfig';
import { CommentType } from 'redux/Comment';

const STYLE = {
  border: '1px solid #ddd',
};

const Wrapper = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
`;

const Cell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #eee;
  border-right: 1px solid #eee;
`;

interface PropsType {
  comments: CommentType[];
}

export const CommentsTable = (props: PropsType) => {
  const commentsWithHeader: CommentType[] = [
    {
      // @ts-ignore header comment is string
      id: 'id',
      body: 'body',
      filePath: 'filePath',
      url: 'url',
      commentor: 'commentor',
      requester: 'requester',
      pullRequestUrl: 'pullRequestUrl',
      // @ts-ignore to fixheader comment is string
      repositoryId: 'repositoryId',
      // @ts-ignore to fix header comment is string
      creationDate: 'creationDate',
    },
    ...props.comments,
  ];

  const cellRenderer = ({ columnIndex, key, rowIndex, style }: RendererInputType): JSX.Element => {
    const configKey = tableConfig[columnIndex].key || 'error';
    if (!commentsWithHeader[rowIndex]) {
      return (
        <Cell key={key} style={style}>
          vide
        </Cell>
      );
    }
    return (
      <Cell key={key} style={style}>
        {
          // @ts-ignore too much check to do on this commit
          commentsWithHeader[rowIndex][configKey]
        }
      </Cell>
    );
  };

  return (
    <Wrapper>
      <AutoSizer>
        {({ width }) => (
          // @ts-ignore
          <MultiGrid
            fixedColumnCount={fixedColumnCount}
            fixedRowCount={1}
            scrollToColumn={0}
            scrollToRow={0}
            cellRenderer={cellRenderer}
            columnWidth={({ index }) => tableConfig[index] && tableConfig[index].columnWidth}
            columnCount={tableConfig.length}
            enableFixedColumnScroll
            enableFixedRowScroll
            height={500}
            rowHeight={40}
            // +1 is for empty value => will be used for lazy loading
            rowCount={commentsWithHeader.length + 1}
            style={STYLE}
            width={width}
            hideTopRightGridScrollbar
            hideBottomLeftGridScrollbar
          />
        )}
      </AutoSizer>
    </Wrapper>
  );
};
