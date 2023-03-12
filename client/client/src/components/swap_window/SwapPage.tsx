import classes from './SwapPage.module.css'
import {useState} from "react";

const SwapPage = () => {
  const [sell_val, setSell] = useState('');
  const [buy_val, setBuy] = useState('');

  // @ts-ignore
  const handle_sell = (event) => {
    const result = event.target.value.replace(/\D/g, '');
    setSell(result);
  };

  // @ts-ignore
  const handle_buy = (event) => {
    const result = event.target.value.replace(/\D/g, '');
    setBuy(result);
  };

  return(
    <div className={classes.exchange}>
      <div className={classes.input_div}>
        <label>Обменять </label>
      </div>
      <div className={classes.input_div}>
        <div className={classes.btn}>
          <input onChange={handle_sell} placeholder="sell 0.00" value={sell_val} className={classes.input}/>
          <button className={classes.button}> выберите токен </button>
        </div>
        <div className={classes.btn}>
          <input onChange={handle_buy} placeholder="buy 0.00" value={buy_val} className={classes.input}/>
          <button className={classes.button}> выберите токен </button>
        </div>
        <div className={classes.btn}>
          <button className={classes.button}> подключить кошелек </button>
        </div>
      </div>
    </div>
  )
}

export default SwapPage;