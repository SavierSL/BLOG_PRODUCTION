export interface InitialState {
  token: string;
  loading: boolean;
}

export const initialState: InitialState = {
  token: "",
  loading: false,
};

interface Action {
  type: string;
  payload: object | string;
}

export const post = (state = initialState, action: Action): InitialState => {
  const { type, payload } = action;
  switch (type) {
    default: {
      return state;
    }
  }
};
