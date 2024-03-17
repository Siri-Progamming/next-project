import { render, screen } from '@testing-library/react';
import Index from '../pages/index';
import { useAuth } from '../src/contexts/auth';
//
const useRouter = jest.spyOn(require('next/router'), 'useRouter');
useRouter.mockImplementation(() => ({
    pathname: '/',
    ...moreRouterData
}));
jest.mock('../src/contexts/auth');
describe('Index', () => {
    beforeEach(() => {
        useRouter.mockReturnValue({
            push: jest.fn(), //Cette fonction ne fait rien
        });
    });
    it('redirects to sign-in page if user is not authenticated', () => {
        useAuth.mockReturnValue({
            user: null,
        });
        render(<Index />);
        expect(useRouter().push).toHaveBeenCalledWith('/ui/sign-in');
    });
    it('does not redirect if user is authenticated', () => {
        useAuth.mockReturnValue({
            user: { /* mock user data */ },
        });
        render(<Index />);
        expect(useRouter().push).not.toHaveBeenCalled();
    });
    it('renders the title correctly', () => {
        render(<Index />);
        expect(screen.getByText('Toprated')).toBeInTheDocument();
    });
    it('renders the sign-in link correctly', () => {
        render(<Index />);
        expect(screen.getByText('Discover')).toBeInTheDocument();
    });
});
