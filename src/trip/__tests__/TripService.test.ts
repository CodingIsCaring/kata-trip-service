import 'jest';
import TripService from '../TripService';
import User from '../../user/User';
import UserSession from '../../user/UserSession';
import TripDAO from '../TripDAO';
import Trip from '../Trip';

describe('TripService', () => {
  const tripService: TripService = new TripService();

  describe('gets trips when user is empty', () => {
    it('and another user must be logged', () => {
      const user: User = new User();
      UserSession.getLoggedUser = () => new User();

      const tripsByUser = tripService.getTripsByUser(user);

      expect(tripsByUser).toMatchSnapshot();
    });
    it.todo('not logged user needed');
  });

  describe('get trips when user is not empty', () => {
    describe('and another user must be logged', () => {
      const loggedUser: User = new User();

      it('and must be friend with the initial user', () => {
        const userWithTrip: User = new User();
        userWithTrip.addTrip(new Trip());
        UserSession.getLoggedUser = () => loggedUser;
        userWithTrip.addFriend(loggedUser);
        TripDAO.findTripsByUser = () => {
          const trips: Trip[] = [];
          trips.push(new Trip());
          return trips;
        };

        const tripsByUser = tripService.getTripsByUser(userWithTrip);

        expect(tripsByUser).toMatchSnapshot();
      });

      it('and they are not friends', () =>{
        const userWithTrip: User = new User();
        UserSession.getLoggedUser = () => loggedUser;

        const tripsByUser = tripService.getTripsByUser(userWithTrip);

        expect(tripsByUser).toMatchSnapshot();
      });
    });
    it.todo('not logged user needed');
  });
});
