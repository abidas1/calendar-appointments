import { connect } from "react-redux";
import AgendaDay from "./AgendaDay";
import { closeAgenda } from "../../redux/actions";
import { IReminderObj } from "../../types/types";

interface Props {}

interface State {
  agendaStatus: {
    isOpen: boolean;
    date: Date;
    dayReminders: IReminderObj[];
  };
}

const mapStateToProps = (state: State, ownProps: Props) => {
  const { agendaStatus } = state;

  return { agendaStatus };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onClose: () => {
      dispatch(closeAgenda());
    },
  };
};

const AgendaDayContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AgendaDay);

export default AgendaDayContainer;
