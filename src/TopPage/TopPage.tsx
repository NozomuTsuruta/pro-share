import React, { useState } from 'react';
import Auth from './Auth';
import { Modal, Icon, Button, Segment } from 'semantic-ui-react';
import classes from './TopPage.module.css';

const TopPage = () => {
  const [modal, setModal] = useState(false);
  return (
    <div className={classes.TopPage}>
      <div className={classes.Header}>
        <h1 className={classes.HeaderTitle}>
          <Icon name='code' />
          Pro-Share.
        </h1>
        <Button color='facebook' onClick={() => setModal(true)}>
          新規登録/ログイン
        </Button>
      </div>
      <div className={classes.Container}>
        <h1 className={classes.Top}>プログラミング特化型情報共有サイト</h1>
        <h1 className={classes.Title}>Pro-Share.</h1>
        <div className={classes.Wrap}>
          <div className={classes.Command}>
            <h1 className={classes.List}>勉強方法を共有する</h1>
            <h1 className={classes.List}>勉強を記録する</h1>
            <h1 className={classes.List}>勉強方法を知る</h1>
          </div>
          <button className={classes.Button} onClick={() => setModal(true)}>
            <h1 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 40 }}>
              Start
            </h1>
          </button>
        </div>
      </div>
      <Modal open={modal} style={{width: 450}} onClose={() => setModal(false)}>
        <Auth />
      </Modal>
    </div>
  );
};

export default TopPage;
