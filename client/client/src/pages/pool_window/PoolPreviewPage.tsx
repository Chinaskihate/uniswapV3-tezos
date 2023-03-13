import classes from './PoolPreviewPage.module.css'
import {Container} from "react-bootstrap";

const PoolPreviewPage = () => {
  return(
    <div className="d-flex justify-content-center align-items-center m-5">
      <Container className="col-xl-4 col-lg-6 col-md-10 col-xs-12">
        <div className={classes.exchange}>
          <div className={classes.input_div}>
            <label> Пул </label>
          </div>
          <div className={classes.input_div}>
            <div className={classes.btn}>
              <button className={classes.button}> подключить кошелек </button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default PoolPreviewPage;