import React, { useState, useEffect } from 'react';
import Daily from './Daily';
import Synthesis from './Synthesis';
import firebase from '../config/firebase';
import MediaQuery from 'react-responsive';
import { Button, Message } from 'semantic-ui-react';
import RecordForm from './RecordForm';
import Gragh from './Gragh';
import { RecordType } from '../Types';

const Record = ({ user }: any) => {
  const [dailyRecord, setDailyRecord] = useState<RecordType[]>([]);
  const [synthesisRecord, setSynthesisRecord] = useState<RecordType[]>([]);
  const [toggle, setToggle] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const [recordsRef] = useState(firebase.firestore().collection('records'));

  useEffect(() => {
    if (user) {
      recordsRef.onSnapshot((snapshot) => {
        const recordArray = snapshot.docs
          .filter((doc) => doc.id === user.uid)
          .map((doc) => {
            return doc.data();
          });
        if (recordArray.length > 0) {
          setOpen(recordArray[0].open);
          setSynthesisRecord(recordArray[0].record);
          const date = new Date();
          const y = date.getFullYear();
          const m = date.getMonth() + 1;
          const d = date.getDate();
          const dailyRecordArray = recordArray[0].record.filter(
            (record: RecordType) =>
              String(record.time).includes(`${y}年${m}月${d}日`)
          );
          setDailyRecord(dailyRecordArray);
        }
      });
    }
  }, [user]);

  const changeOpen = () => {
    if (synthesisRecord.length > 0) {
      recordsRef.doc(user.uid).update({
        open: !open,
      });
      setError('');
    } else {
      setError('公開するデータがありません');
    }
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          height: 40,
          marginBottom: 30,
        }}
      >
        <h1 style={{ marginRight: 10 }}>学習記録</h1>
        <Button onClick={changeOpen}>
          {open ? '非公開にする' : '公開する'}
        </Button>
      </div>
      <Gragh record={synthesisRecord} />
      <RecordForm open={open} user={user} record={synthesisRecord} />
      {error && <Message negative>{error}</Message>}
      <MediaQuery query='(max-width: 670px)'>
        <div style={{ width: '90vw', margin: '10px 5vw' }}>
          <Button
            active={!toggle}
            onClick={() => setToggle(false)}
            style={{ width: '45vw', margin: 0 }}
          >
            デイリー
          </Button>
          <Button
            active={toggle}
            onClick={() => setToggle(true)}
            style={{ width: '45vw', margin: 0 }}
          >
            合計
          </Button>
        </div>
        {toggle ? (
          <div style={{ width: '90vw', margin: '10px 5vw' }}>
            <Synthesis record={synthesisRecord} />
          </div>
        ) : (
          <div style={{ width: '90vw', margin: '10px 5vw' }}>
            <Daily record={dailyRecord} />
          </div>
        )}
      </MediaQuery>
      <MediaQuery query='(min-width: 671px)'>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Daily record={dailyRecord} />
          <Synthesis record={synthesisRecord} />
        </div>
      </MediaQuery>
    </>
  );
};

export default Record;
