import React, { useState, useEffect } from 'react';
import { List, AutoSizer, WindowScroller, ListRowProps } from 'react-virtualized';
import { clsx } from 'clsx';

interface VirtualizedListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  itemHeight?: number;
  overscanRowCount?: number;
  scrollElement?: HTMLElement | Window;
  className?: string;
  onItemsRendered?: (info: { startIndex: number; stopIndex: number }) => void;
}

function VirtualizedList<T>({
  items,
  renderItem,
  itemHeight = 200,
  overscanRowCount = 5,
  scrollElement,
  className,
  onItemsRendered
}: VirtualizedListProps<T>) {
  const [scrollEl, setScrollEl] = useState<HTMLElement | Window | undefined>(scrollElement);
  
  // Set scroll element to window if not provided
  useEffect(() => {
    if (!scrollElement && typeof window !== 'undefined') {
      setScrollEl(window);
    } else {
      setScrollEl(scrollElement);
    }
  }, [scrollElement]);
  
  // Row renderer function
  const rowRenderer = ({ index, key, style }: ListRowProps) => {
    return (
      <div key={key} style={style}>
        {renderItem(items[index], index)}
      </div>
    );
  };
  
  // Handle items rendered event
  const handleItemsRendered = ({ startIndex, stopIndex }: { startIndex: number; stopIndex: number }) => {
    if (onItemsRendered) {
      onItemsRendered({ startIndex, stopIndex });
    }
  };
  
  if (!items.length) {
    return null;
  }
  
  return (
    <div className={clsx('w-full', className)}>
      {scrollEl && (
        <WindowScroller scrollElement={scrollEl}>
          {({ height, isScrolling, onChildScroll, scrollTop }) => (
            <AutoSizer disableHeight>
              {({ width }) => (
                <List
                  autoHeight
                  height={height || 500}
                  width={width}
                  isScrolling={isScrolling}
                  onScroll={onChildScroll}
                  overscanRowCount={overscanRowCount}
                  rowCount={items.length}
                  rowHeight={itemHeight}
                  rowRenderer={rowRenderer}
                  scrollTop={scrollTop}
                  onRowsRendered={({ startIndex, stopIndex }) => 
                    handleItemsRendered({ startIndex, stopIndex })
                  }
                />
              )}
            </AutoSizer>
          )}
        </WindowScroller>
      )}
    </div>
  );
}

export default VirtualizedList;