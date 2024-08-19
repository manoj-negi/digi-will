/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import { jsx } from '@keystone-ui/core';
import { component, fields, NotEditable } from '@keystone-6/fields-document/component-blocks';

export const RedirectLink = component({
  label: 'App Link',
  schema: {
    appLabel: fields.text({
      label: 'label',
      defaultValue: '',
    }),
    appScreen: fields.url({
      label: 'navigation screen',
      defaultValue: '',
    }),
  },
  preview: function RedirectLink(props) {
    return (
      <NotEditable>
        <div
          css={{
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <p style={{ color: 'blue' }}>
            <strong>{props.fields.appLabel.value}</strong>
          </p>
        </div>
      </NotEditable>
    );
  },
});
