import type { ReactNode } from 'react';
import React, { useState } from 'react';
import {Card, Collapsible, Text, Icon} from '@shopify/polaris';

import {ChevronDownIcon, ChevronUpIcon} from '@shopify/polaris-icons';

interface AccordionItemProps {
  title: string;
  children: ReactNode;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ marginBottom: '16px' }}>
      <Card padding="400">
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            cursor: 'pointer',
            gap: '10px'
          }}
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls={`section-${title}`}
        >
          <span><Icon source={open ? ChevronUpIcon : ChevronDownIcon} tone="base"/></span>
          <span>{title}</span>

        </div>
        <Collapsible
          open={open}
          id={`section-${title}`}
          transition={{duration: '250ms', timingFunction: 'ease'}}
        >
          <div style={{
            marginTop: '16px',
            padding: '16px',
            background: '#f9f9f9',
            border: '1px solid #ddd',
            borderRadius: '4px'
          }}>
            <Text as="span" >
              {children}
            </Text>
          </div>
        </Collapsible>
      </Card>
    </div>
  );
};



export default AccordionItem;
