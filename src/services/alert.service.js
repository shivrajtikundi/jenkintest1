import { ToastContainer, toast } from 'react-toastify';
export const alertService = {
  throwWarning,
  throwError,
  throwSuccess,
  throwLoading,
  throwPromise,
  throwPromiseWithOutSuccess,
};
function throwWarning(msg) {
  toast.warn(msg, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
}
function throwError(msg) {
  toast.error(msg, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
}
function throwSuccess(msg) {
  toast.success(msg, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
}

function throwLoading(msg) {
  toast.loading(msg, {
    position: 'top-right',
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
}

function throwPromise(promise) {
  toast.promise(promise, {
    pending: 'Please wait ...',
    success: {
      render({ data }) {
        return `${data}`;
      },
    },
    error: {
      render({ data }) {
        return `${data}`;
      },
    },
  });
}

function throwPromiseWithOutSuccess(promise) {
  toast.promise(promise, {
    pending: 'Please wait ...',
    success: {
      render({ data }) {
        return false;
      },
    },
    error: {
      render({ data }) {
        return `${data}`;
      },
    },
  });
}
