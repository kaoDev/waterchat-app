import * as React from 'react'
import { PureComponent } from 'react'
import {
  List,
  CellMeasurer,
  CellMeasurerCache,
  AutoSizer,
  ListRowRenderer,
  Index,
} from 'react-virtualized'
import { Message } from './message'
import { Message as MessageData } from '../models/message'
import { User } from '../models/user'
import { FillContainer } from './generic'

export type MessageListProps = {
  readonly messages: MessageData[]
  readonly users: User[]
  readonly self: User
}

export class MessageList extends PureComponent<MessageListProps, {}> {
  private _cache = new CellMeasurerCache({
    fixedWidth: true,
    minHeight: 80,
  })

  private _rowHeight = (params: Index) => {
    return this._cache.rowHeight(params) || 0
  }

  private _list: List | undefined

  render() {
    const { messages } = this.props
    return (
      <FillContainer>
        <AutoSizer>
          {({ width, height }) =>
            <List
              deferredMeasurementCache={this._cache}
              height={height}
              width={width}
              overscanRowCount={5}
              rowCount={messages.length}
              rowHeight={this._rowHeight}
              rowRenderer={this._rowRenderer}
              ref={ref => (this._list = ref)}
            />}
        </AutoSizer>
      </FillContainer>
    )
  }
  componentDidUpdate(prevProps: MessageListProps) {
    if (
      prevProps.messages !== this.props.messages &&
      this._list !== undefined
    ) {
      this._list.scrollToRow(this.props.messages.length - 1)
      this._list.forceUpdate()
    }
  }

  private _rowRenderer: ListRowRenderer = ({
    index,
    isScrolling,
    key,
    parent,
    style,
  }) => {
    const { messages, self, users } = this.props

    const { content, timestamp, userId } = messages[index]
    const ownMessage = self.userId === userId
    const { profilePicture, displayName } = users.find(
      u => u.userId === userId
    ) || { displayName: '', profilePicture: '' }

    const messageProps = {
      content,
      ownMessage,
      timestamp,
      userName: displayName,
      profilePicture,
      style,
    }

    return (
      <CellMeasurer
        cache={this._cache}
        columnIndex={0}
        key={key}
        rowIndex={index}
        parent={parent as any}
      >
        <Message {...messageProps} />
      </CellMeasurer>
    )
  }
}
