import {
  createContext,
  useContext,
  useMemo,
  useState,
  ReactNode,
  useCallback,
} from 'react';

import FileDownload from 'js-file-download';

import { FileType } from 'types/FileType';
import { MetaType } from 'types/MetaType';
import { OrderType } from 'types/OrderType';
import { PaginateParams } from 'types/PaginateParams';
import { SiloFileType } from 'types/SiloFileType';
import { SiloType } from 'types/SiloType';

import api from '../helpers/api';
import { useOrganizations } from './Organizations';

const uploadTimeout = process.env.MIX_FILE_UPLOAD_TIMEOUT || 60 * 1000;
const downloadTimeout = process.env.MIXMIX_FILE_DOWNLOAD_TIMEOUT || 60 * 1000;

export type SilosType = {
  showModal: string | null;
  showModalFile: string | null;
  setFormState: (val: string) => void;
  setShowModal: (val: string | null) => void;
  setShowModalFile: (val: string | null) => void;
  fetchSiloHandler: (silo: SiloType, params?: any) => void;
  saveSiloHandler: (folderId: number, data: SiloFileType) => void;
  saveSiloFolderHandler: (data: SiloType) => void;
  setFilesToUpload: (files: FileList | null) => void;
  showSilo: SiloType | null;
  isLoadingSilos: boolean;
  isLoadingSilo: boolean;
  isLoadingSave: boolean;
  isLoadingSaveSiloFolder: boolean;
  initialValues: any;
  formState: string;
  isUpdating: boolean;
  formSuccess: string[] | null;
  silos: any;
  files: SiloFileType[] | null;
  downloadSiloFile: (siloFile: SiloFileType) => void;
  fetchSilosHandler: (
    search: string | null,
    params?: PaginateParams | null
  ) => void;
  setInitialValues: (obj: any) => void;
};

export const SilosContext = createContext<SilosType | null>(null);

const useSilos = () => {
  const context = useContext(SilosContext);
  if (!context) {
    throw new Error('useSilos must be within SilosProvider');
  }

  return context;
};

interface SilosProviderProps {
  children: ReactNode;
}

const SilosProvider = ({ children }: SilosProviderProps) => {
  const [showModal, setShowModal] = useState<string | null>(null);
  const [showModalFile, setShowModalFile] = useState<string | null>(null);
  const [order, setOrder] = useState<OrderType>();
  const [silosMeta, setSilosMeta] = useState<MetaType | null>(null);
  const [isLoadingSilos, setIsLoadingSilos] = useState(false);
  const [isLoadingSilo, setIsLoadingSilo] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isLoadingDownload, setIsLoadingDownload] = useState(false);
  const [silos, setSilos] = useState([]);
  const [files, setFiles] = useState<SiloFileType[] | null>(null);
  const [initialValues, setInitialValues] = useState({});

  const [filesToUpload, setFilesToUpload] = useState<FileList | null>(null);
  const [showSilo, setShowSilo] = useState<SiloType | null>(null);

  const [formSuccess, setFormSuccess] = useState<string[] | null>(null);

  // silo save handler
  const [isLoadingSave, setIsLoadingSave] = useState(false);
  const [isLoadingSaveSiloFolder, setIsLoadingSaveSiloFolder] = useState(false);
  const [formState, setFormState] = useState('form');

  const { getOrganizationId } = useOrganizations();

  const fetchSiloHandler = useCallback(
    async (sil: SiloType, params?: any) => {
      try {
        const organizationId = await getOrganizationId();
        setIsLoadingSilo(true);
        const response = await api.get(
          `organizations/${organizationId}/folders/${sil.id}/files`,
          {
            params,
          }
        );
        setShowSilo(sil);
        setFiles(response?.data?.data);
      } catch (e) {
        setFiles(null);
        // [todo]
        // toaster(
        //   dispatch,
        //   'Error while trying to load the departmentSources',
        //   'error'
        // );
      } finally {
        setIsLoadingSilo(false);
      }
    },
    [getOrganizationId]
  );

  const saveSiloHandler = useCallback(
    async (folderId: number, data: SiloFileType) => {
      try {
        // eslint-disable-next-line no-console
        console.log({ folderId, data });
        setIsLoadingSave(true);
        const organizationId = await getOrganizationId();
        const method = data?.id ? 'put' : 'post';
        const url = data?.id
          ? `organizations/${organizationId}/folders/${folderId}/files/${data?.id}`
          : `organizations/${organizationId}/folders/${folderId}/files`;

        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('file', data.file as File);

        const response = await api({
          method,
          url,
          data: formData,
        });
        setFormSuccess(['Silo created!']);
        fetchSiloHandler(
          silos.find((e: SiloType) => e.id === folderId) as unknown as SiloType
        );
        // setSiloView(response?.data);
      } catch (e) {
        // setSiloView(null);
        // [todo]
        // toaster(
        //   dispatch,
        //   'Error while trying to load the departmentSources',
        //   'error'
        // );
      } finally {
        setIsLoadingSave(false);
      }
    },
    []
  );

  const downloadSiloFile = async (siloFile: SiloFileType) => {
    const organizationId = await getOrganizationId();
    setIsLoadingDownload(true);
    const file = siloFile.file as FileType;
    api
      .get(
        `/organizations/${organizationId}/folders/${showSilo?.id}/files/${siloFile.id}/download`,
        {
          responseType: 'blob',
          timeout: downloadTimeout as number,
        }
      )
      .then((response) => FileDownload(response.data, file.original))
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      })
      .finally(() => {
        setIsLoadingDownload(false);
      });
  };

  const fetchSilosHandler = useCallback(
    async (
      search: string | null = null,
      params: PaginateParams | null = null
    ) => {
      const organizationId = await getOrganizationId();
      try {
        setIsLoadingSilos(true);

        if (params?.order_by) {
          setOrder({ ...order, order_by: params?.order_by });
        }
        if (params?.direction) {
          setOrder({ ...order, direction: params?.direction });
        }

        let auxParams: PaginateParams = {
          ...params,
          order_by: order?.order_by,
          direction: order?.direction,
          page: params?.page ?? silosMeta?.current_page,
        };

        if (search && search?.length > 0) {
          auxParams = {
            ...auxParams,
            q: search,
          };
        }

        // eslint-disable-next-line no-console
        console.log(organizationId);
        const response = await api.get(
          `organizations/${organizationId}/folders/`,
          {
            params: auxParams,
          }
        );

        setSilos(response?.data?.data);
        setSilosMeta(response?.data?.meta);
      } catch (e) {
        setSilos([]);
        // [todo]
        // toaster(
        //   dispatch,
        //   'Error while trying to load the departmentSources',
        //   'error'
        // );
      } finally {
        setIsLoadingSilos(false);
      }
    },
    [order, getOrganizationId]
  );

  const saveSiloFolderHandler = useCallback(async (data: SiloType) => {
    try {
      // eslint-disable-next-line no-console
      console.log({ data });
      setIsLoadingSaveSiloFolder(true);
      const organizationId = await getOrganizationId();
      const method = data?.id ? 'put' : 'post';
      const url = data?.id
        ? `organizations/${organizationId}/folders/${data?.id}`
        : `organizations/${organizationId}/folders`;

      await api({
        method,
        url,
        data,
      });
      setFormSuccess(['Silo Folder created!']);
      fetchSilosHandler(null);
      // setSiloView(response?.data);
    } catch (e) {
      // setSiloView(null);
      // [todo]
      // toaster(
      //   dispatch,
      //   'Error while trying to load the departmentSources',
      //   'error'
      // );
    } finally {
      setIsLoadingSaveSiloFolder(false);
    }
  }, []);

  const providerValue = useMemo(
    () => ({
      showModal,
      showModalFile,
      setShowModal,
      fetchSilosHandler,
      showSilo,
      isLoadingSilos,
      isLoadingSilo,
      isUpdating,
      silos,
      files,
      saveSiloHandler,
      isLoadingSave,
      setFormState,
      formState,
      formSuccess,
      initialValues,
      silosMeta,
      fetchSiloHandler,
      setInitialValues,
      downloadSiloFile,
      saveSiloFolderHandler,
      setShowModalFile,
      setFilesToUpload,
      isLoadingSaveSiloFolder,
    }),
    [
      isLoadingSaveSiloFolder,
      showModalFile,
      setFilesToUpload,
      setShowModalFile,
      setInitialValues,
      fetchSiloHandler,
      initialValues,
      formSuccess,
      formState,
      setFormState,
      isLoadingSave,
      saveSiloHandler,
      showModal,
      silos,
      files,
      isLoadingSilos,
      isLoadingSilo,
      setShowModal,
      isUpdating,
      fetchSilosHandler,
      showSilo,
      silosMeta,
      downloadSiloFile,
      saveSiloFolderHandler,
    ]
  );

  return (
    <SilosContext.Provider value={providerValue}>
      {children}
    </SilosContext.Provider>
  );
};

export { SilosProvider, useSilos };