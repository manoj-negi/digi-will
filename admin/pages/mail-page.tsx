/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useRef } from 'react';
import { PageContainer } from '@keystone-6/core/admin-ui/components';
import { useRouter } from 'next/router';
import { Select } from '@keystone-ui/fields';
import { jsx, Heading } from '@keystone-ui/core';
import { Editor } from '@tinymce/tinymce-react';
import { useToasts } from '@keystone-ui/toast';
import { Button } from '@keystone-ui/button';
import { gql, useMutation, useQuery } from '@apollo/client';

const mail = gql`
  mutation ($html: String!, $type: String!) {
    sendBulkMail(html: $html, type: $type) {
      message
    }
  }
`;

const role = gql`
  query {
    authenticatedItem {
      ... on User {
        id
        isAdmin
      }
    }
  }
`;

export default function CustomPage() {
  const router = useRouter();
  const { addToast } = useToasts();
  const [sendMail, { data: mailSuccess, loading, error: mailFailiure }] = useMutation(mail);
  const { data: isAdmin, error } = useQuery(role);
  const [mailTo, setMailTo] = React.useState({
    label: 'mail to',
    value: '',
  });
  const editorRef = useRef(null);

  const Mail = async () => {
    if (editorRef.current && mailTo.value) {
      sendMail({
        variables: {
          html: JSON.stringify(editorRef.current.getContent()),
          type: mailTo.value,
        },
      });
    } else {
      addToast({
        title: `Mail`,
        message: 'Please choose mail type',
        tone: 'warning',
      });
    }
  };

  React.useEffect(() => {
    if (!mailSuccess) return;
    addToast({
      title: `Mail`,
      message: 'Mail sent succfully',
      tone: 'positive',
    });
  }, [mailSuccess]);

  React.useEffect(() => {
    if (isAdmin && !isAdmin?.authenticatedItem?.isAdmin) {
      router.push('/');
    }
  }, [isAdmin]);

  React.useEffect(() => {
    if (mailFailiure) {
      addToast({
        title: `Mail`,
        message: 'Somthing went wrong',
        tone: 'negative',
      });
    }
  }, [mailFailiure]);

  return isAdmin?.authenticatedItem?.isAdmin ? (
    <PageContainer header={<Heading type="h3">Mail</Heading>}>
      <Select
        width="small"
        value={mailTo}
        options={[
          {
            label: 'All',
            value: 'ALL',
          },
          {
            label: 'Willmeetup',
            value: 'WILLMEETUP',
          },
          {
            label: 'Paid Users',
            value: 'PAID_USERS',
          },
        ]}
        onChange={setMailTo as any}
      />
      <Editor
        apiKey={process.env.TINYMC_API_KEY || '2o29izks11uxeewky871158ukl0r5r383wxef6rl2vcx40hp'}
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue=""
        init={{
          branding: false,
          height: 300,
          menubar: false,
          toolbar:
            'undo redo | formatselect | ' +
            'bold italic backcolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
        }}
      />
      <Button
        onClick={() => {
          Mail();
        }}
        tone="active"
        style={{ marginTop: '10px' }}
      >
        Send
      </Button>
    </PageContainer>
  ) : null;
}
