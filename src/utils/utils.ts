import Hashids from 'hashids';
import { Dialog, Loading, Notify, QSpinnerBall } from 'quasar';
import ConfirmPopUp from 'src/components/popup/ConfirmPopUp.vue';
import CopyPopUp from 'src/components/popup/CopyPopUp.vue';
import PopUp from 'src/components/popup/PopUp.vue';
import SendMessagePopUp from 'src/components/popup/SendMessagePopUp.vue';
import { Address } from 'src/models/address';
import ZipCode from 'src/models/valueObjects/zipCode';
import { useAddressStore } from 'src/stores/useAddressStore';

const implementHierarchy = (necessaryPermission: string): boolean => {
  switch (necessaryPermission) {
    case 'sysAdmin':
      return ['support'].includes(
        atob(localStorage.getItem('userType') || '')
      );
    case 'admin':
      return ['support', 'admin'].includes(
        atob(localStorage.getItem('userType') || '')
      );
    case 'polo':
      return ['support', 'admin', 'polo'].includes(
        atob(localStorage.getItem('userType') || '')
      );
    case 'store':
      return ['support', 'admin', 'polo', 'store'].includes(
        atob(localStorage.getItem('userType') || '')
      );
    case 'seller':
      return ['support', 'admin', 'polo', 'store', 'seller'].includes(
        atob(localStorage.getItem('userType') || '')
      );
    default:
      return false;
  }
};

class NotifyError {
  static success = (message: string): void => {
    Notify.create({
      message,
      color: 'positive',
      classes: 'text-h5',
    });
  };

  static error = (message: string): void => {
    Notify.create({
      message,
      color: 'negative',
      classes: 'text-h5',
    });
  };

  static warning = (message: string): void => {
    Notify.create({
      message,
      color: 'warning',
      classes: 'text-h5',
    });
  };

  static info = (message: string): void => {
    Notify.create({
      message,
      color: 'info',
      classes: 'text-h5',
    });
  };
}

class ShowLoading {
  static show = (message: string): void => {
    Loading.show({
      spinner: QSpinnerBall,
      spinnerColor: 'secondary',
      spinnerSize: 140,
      message,
      customClass: 'text-h5',
    });
  };

  static hide = (message?: string): void => {
    this.show(message || '');
    setTimeout(() => {
      Loading.hide();
    }, 1000);
  };
}

class ShowDialog {
  static show = (
    title: string,
    description: string,
    iconName = 'error'
  ): void => {
    Dialog.create({
      component: PopUp,

      componentProps: {
        title,
        description,
        iconName,
      },
    });
  };

  static showConfirm = (
    title: string,
    message: string,
    color?: string
  ): Promise<boolean> => {
    return new Promise((resolve) => {
      Dialog.create({
        component: ConfirmPopUp,

        componentProps: {
          title,
          message,
          color,
        },
      })
        .onOk(() => {
          resolve(true);
        })
        .onCancel(() => {
          resolve(false);
        });
    });
  };

  static showCopyToClipboard = (
    title: string,
    description: string,
    stringToCopy: string,
    redirectTo?: string
  ): void => {
    Dialog.create({
      component: CopyPopUp,

      componentProps: {
        title,
        description,
        stringToCopy,
        redirectTo,
      },
    });
  };

  static showSendMessagePopUp = (
    title: string,
    description: string,
    message = ''
  ): void => {
    Dialog.create({
      component: SendMessagePopUp,

      componentProps: {
        title,
        description,
        message,
      },
    });
  };
}

class AddressUtils {
  private static mixAddresses = (
    addressReceiver: Address,
    searchedAddress: Address
  ): void => {
    addressReceiver.city = searchedAddress.city;
    addressReceiver.uf = searchedAddress.uf;
    addressReceiver.neighborhood =
      addressReceiver.neighborhood || searchedAddress.neighborhood;
    addressReceiver.street = addressReceiver.street || searchedAddress.street;
    addressReceiver.number = addressReceiver.number || searchedAddress.number;
    addressReceiver.zipCode = searchedAddress.zipCode;
    addressReceiver.complement =
      addressReceiver.complement || searchedAddress.complement;
    addressReceiver.ibgeCode =
      addressReceiver.ibgeCode || searchedAddress.ibgeCode;
    addressReceiver.ddd = addressReceiver.ddd || searchedAddress.ddd;
    addressReceiver.siafi = addressReceiver.siafi || searchedAddress.siafi;
  };

  static getAddress = async (
    cep: ZipCode,
    addressReceiver: Address
  ): Promise<void> => {
    await ShowLoading.show(
      `Buscando endereço para o CEP ${cep.getCodeFormatted()}...`
    );
    try {
      const result = await useAddressStore().fetchCep(
        cep.getCodeWithoutSymbols()
      );
      await ShowLoading.hide('Endereço encontrado, carregando dados...');
      this.mixAddresses(addressReceiver, result);
    } catch (error: any) {
      await ShowLoading.hide(error.message);
    }
  };
}

class HashIds {
  //hashids para codificar e decodificar números (ou IDs) em strings curtas
  public static hash = new Hashids('', 20);
  static encryptId = (value: string): string =>
    this.hash.encode(parseInt(value, 20));
  static decryptId = (value: string): string =>
    this.hash.decode(value)[0].toString(20);
}
export {
  implementHierarchy,
  NotifyError,
  ShowLoading,
  ShowDialog,
  AddressUtils,
  HashIds,
};

//export { implementHierarchy, NotifyError, ShowLoading, ShowDialog, HashIds }
