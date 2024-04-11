import { render, screen } from '@testing-library/react';
import Index from '../pages/index';
import { useAuth } from '../src/contexts/AuthContext';
import expect from "expect";
import {it} from "node:test";
//
const useRouter = jest.spyOn(require('next/router'), 'useRouter');
useRouter.mockImplementation(() => ({
    pathname: '/',
    ...moreRouterData
}));
jest.mock('../src/contexts/AuthContext');
describe('Index', () => {
    beforeEach(() => {
        useRouter.mockReturnValue({
            push: jest.fn(), //Cette fonction ne fait rien
        });
    });
    // it('redirects to sign-in page if user is not authenticated', () => {
    //     useAuth.mockReturnValue({
    //         user: null,
    //     });
    //     render(<Index />);
    //     expect(useRouter().push).toHaveBeenCalledWith('/ui/sign-in');
    // });
    // it('does not redirect if user is authenticated', () => {
    //     useAuth.mockReturnValue({
    //         user: {id: 1, name:'test', email: 'test@test.com'},
    //     });
    //     render(<Index />);
    //     expect(useRouter().push).not.toHaveBeenCalled();
    // });
    // it('renders the title correctly', () => {
    //     useAuth.mockReturnValue({
    //         user: {id: 1, name:'test', email: 'test@test.com'},
    //     });
    //     render(<Index />);
    //     expect(screen.getByText('tendances')).toBeInTheDocument();
    // });
    it('renders the Discover list correctly', () => {
        render(<Index />);
        expect(screen.getByText('mieux')).toBeInTheDocument();
    });
});
