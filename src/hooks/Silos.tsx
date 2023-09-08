import { ReactNode, createContext, useCallback, useContext, useMemo, useState } from 'react';

import { filterAttributes } from '@constants/cubesConstants';
import FileDownload from 'js-file-download';
import { map } from 'lodash';

import { FileType } from 'types/FileType';
import { MetaType } from 'types/MetaType';
import { OrderType } from 'types/OrderType';
import { PaginateParams } from 'types/PaginateParams';
import { SiloFileType } from 'types/SiloFileType';
import { SiloType } from 'types/SiloType';

import api from '../helpers/api';
import { SiloFileAttributeType } from '../types/SiloFileAttributeType';
import { useOrganization } from './Organization';

const uploadTimeout = import.meta.env.MIX_FILE_UPLOAD_TIMEOUT || 60 * 1000;
const downloadTimeout = import.meta.env.MIXMIX_FILE_DOWNLOAD_TIMEOUT || 60 * 1000;

export type SilosType = {
  showModal: string | null;
  showModalFile: string | null;
  folder: number | null;
  setFolder: (val: number) => void;
  setFormState: (val: string) => void;
  setSelectedColumns: (val: any) => void;
  setShowModal: (val: string | null) => void;
  setShowModalFile: (val: string | null) => void;
  fetchSiloHandler: (silo: SiloType, params?: any) => void;
  fetchSiloFilesAttributesHandler: (silo: number, params?: any) => void;
  fetchSiloFileAttributesHandler: (siloId: number, fileId: number, params?: any) => void;
  saveSiloHandler: (folderId: number, data: SiloFileType) => void;
  deleteSiloFolderHandler: (folderId: number) => void;
  saveSiloFolderHandler: (data: SiloType) => void;
  handleBulkSelectColumn: (file: any, attribute: any, items: string[]) => void;
  setFilesToUpload: (files: FileList | null) => void;
  showSilo: SiloType | null;
  isLoadingSilos: boolean;
  isLoadingSilo: boolean;
  isLoadingSiloFilesAttributes: boolean;
  isLoadingSave: boolean;
  isDeletingFolder: boolean;
  isLoadingSaveSiloFolder: boolean;
  isLoadingSiloFileAttributes: boolean;
  initialValues: any;
  formState: string;
  isUpdating: boolean;
  selectedColumns: any;
  formSuccess: string[] | null;
  silos: any;
  siloFilesAttributes: SiloFileType[] | null;
  siloFileAttributes: SiloFileAttributeType[] | null;
  files: SiloFileType[] | null;
  downloadSiloFile: (siloFile: SiloFileType) => void;
  setDeletingFolder: (val: boolean) => void;
  fetchSilosHandler: (search: string | null, params?: PaginateParams | null) => void;
  setInitialValues: (obj: any) => void;
};

export const SilosContext = createContext<SilosType | null>(null);

const useSilo = () => {
  const context = useContext(SilosContext);
  if (!context) {
    throw new Error('useSilo must be within SiloProvider');
  }

  return context;
};

interface ISiloProviderProps {
  children: ReactNode;
  organizationId: number | null;
}

function SiloProvider({ children, organizationId }: ISiloProviderProps) {
  const { organization } = useOrganization();
  const [showModal, setShowModal] = useState<string | null>(null);
  const [showModalFile, setShowModalFile] = useState<string | null>(null);
  const [order, setOrder] = useState<OrderType>();
  const [silosMeta, setSilosMeta] = useState<MetaType | null>(null);
  const [isLoadingSilos, setIsLoadingSilos] = useState(false);
  const [isLoadingSilo, setIsLoadingSilo] = useState(false);
  const [isLoadingSiloFilesAttributes, setIsLoadingSiloFilesAttributes] = useState(false);
  const [isLoadingSiloFileAttributes, setIsLoadingSiloFileAttributes] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isLoadingDownload, setIsLoadingDownload] = useState(false);
  const [silos, setSilos] = useState([]);
  const [files, setFiles] = useState<SiloFileType[] | null>(null);
  const [siloFilesAttributes, setSiloFilesAttributes] = useState<SiloFileType[] | null>(null);
  const [isDeletingFolder, setDeletingFolder] = useState(false);
  const [siloFileAttributes, setSiloFileAttributes] = useState<SiloFileAttributeType[] | null>(
    null,
  );
  const [folder, setFolder] = useState<number | null>(null);
  const [selectedColumns, setSelectedColumns] = useState<Record<string, any>>({});
  const [initialValues, setInitialValues] = useState({});

  const [filesToUpload, setFilesToUpload] = useState<FileList | null>(null);
  const [showSilo, setShowSilo] = useState<SiloType | null>(null);

  const [formSuccess, setFormSuccess] = useState<string[] | null>(null);

  // silo save handler
  const [isLoadingSave, setIsLoadingSave] = useState(false);
  const [isLoadingSaveSiloFolder, setIsLoadingSaveSiloFolder] = useState(false);
  const [formState, setFormState] = useState('form');

  const fetchSiloHandler = useCallback(
    async (sil: SiloType, params?: any) => {
      try {
        setIsLoadingSilo(true);
        const response = await api.get(`organizations/${organizationId}/folders/${sil.id}/files`, {
          params,
        });
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
    [organizationId],
  );

  // eslint-disable-next-line no-console
  // console.log({ selectedColumns });

  const handleBulkSelectColumn = useCallback((file: any, attribute: any, items: any) => {
    // eslint-disable-next-line no-console
    console.log(file, attribute, items);
  }, []);

  const fetchSiloFilesAttributesHandler = useCallback(
    async (sil: number, params: any = null) => {
      try {
        setIsLoadingSiloFilesAttributes(true);
        const response = await api.get(
          `organizations/${organizationId}/folders/${sil}/files/attributes`,
          {
            params,
          },
        );

        const filesAttributes = response?.data?.data;

        // eslint-disable-next-line no-console
        console.log({ filesAttributes });

        setSelectedColumns({});

        let selectedColumnsCopy = { ...selectedColumns };

        filesAttributes?.map((file: SiloFileType) =>
          file?.attributes
            ?.filter((e) => filterAttributes.includes(e.type))
            .map((attribute: SiloFileAttributeType) => {
              const items = map(attribute.attributes, 'name');
              // eslint-disable-next-line no-console
              console.log({ items });
              const filesAlreadyInserted = Object.keys(selectedColumns).map((e) => +e);

              if (!filesAlreadyInserted?.includes(file.id)) {
                selectedColumnsCopy = {
                  ...selectedColumnsCopy,
                  [file.id]: {},
                };
              }

              selectedColumnsCopy = {
                ...selectedColumnsCopy,
                [file.id]: {
                  ...selectedColumnsCopy[file.id],
                  [attribute.name]: Array.isArray(items) ? items : [items],
                },
              };

              // eslint-disable-next-line no-console
              // console.log({ selectedColumnsCopy, file, attribute, items });

              return items;
            }),
        );

        // eslint-disable-next-line no-console
        console.log({ selectedColumnsCopy });

        setSelectedColumns(selectedColumnsCopy);

        setSiloFilesAttributes(response?.data?.data);
      } catch (e) {
        setSiloFilesAttributes(null);
        // [todo]
        // toaster(
        //   dispatch,
        //   'Error while trying to load the departmentSources',
        //   'error'
        // );
      } finally {
        setIsLoadingSiloFilesAttributes(false);
      }
    },
    [organizationId, selectedColumns],
  );

  const fetchSiloFileAttributesHandler = useCallback(
    async (siloId: number, fileId: number, params: any = null) => {
      try {
        setIsLoadingSiloFileAttributes(true);
        const response = await api.get(
          `organizations/${organizationId}/folders/${siloId}/files/${fileId}/attributes`,
          {
            params,
          },
        );

        setSiloFileAttributes(response?.data?.data?.attributes);
      } catch (e) {
        setSiloFileAttributes(null);
        // [todo]
        // toaster(
        //   dispatch,
        //   'Error while trying to load the departmentSources',
        //   'error'
        // );
      } finally {
        setIsLoadingSiloFileAttributes(false);
      }
    },
    [organizationId, selectedColumns],
  );

  const saveSiloHandler = useCallback(
    async (folderId: number, data: SiloFileType) => {
      try {
        setIsLoadingSave(true);
        console.log({ organization });
        const method = data?.id ? 'put' : 'post';
        const url = data?.id
          ? `organizations/${organization?.id}/folders/${folderId}/files/${data?.id}`
          : `organizations/${organization?.id}/folders/${folderId}/files`;

        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('file', data.file as File);

        const response = await api({
          method,
          url,
          data: formData,
          timeout: 600000,
        });
        setFormSuccess(['Silo created!']);
        fetchSiloHandler(silos.find((e: SiloType) => e.id === folderId) as unknown as SiloType);
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
    [fetchSiloHandler, organization, silos],
  );

  const downloadSiloFile = useCallback(
    (siloFile: SiloFileType) => {
      setIsLoadingDownload(true);
      const file = siloFile.file as FileType;
      api
        .get(
          `/organizations/${organizationId}/folders/${showSilo?.id}/files/${siloFile.id}/download`,
          {
            responseType: 'blob',
            timeout: downloadTimeout as number,
          },
        )
        .then((response) => FileDownload(response.data, file.original))
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error);
        })
        .finally(() => {
          setIsLoadingDownload(false);
        });
    },
    [organizationId, showSilo?.id],
  );

  const fetchSilosHandler = useCallback(
    async (search: string | null = null, params: PaginateParams | null = null) => {
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

        const response = await api.get(`organizations/${organizationId}/folders/`, {
          params: auxParams,
        });

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
    [order, organizationId],
  );

  const saveSiloFolderHandler = useCallback(
    async (data: SiloType) => {
      try {
        setIsLoadingSaveSiloFolder(true);
        const method = data?.id ? 'put' : 'post';
        const url = data?.id
          ? `organizations/${organization?.id}/folders/${data?.id}`
          : `organizations/${organization?.id}/folders`;

        await api({
          method,
          url,
          data,
        });
        setFormSuccess(['Silo Folder created!']);
        fetchSilosHandler();
        setShowModal(null);
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
    },
    [fetchSilosHandler, organization],
  );

  const deleteSiloFolderHandler = useCallback(
    async (siloFolderId: number) => {
      try {
        console.log({ organization });
        setIsLoadingSaveSiloFolder(true);
        const url = `organizations/${organization?.id}/folders/${siloFolderId}`

        await api({
          method: 'delete',
          url,
        });
        setFormSuccess(['Silo Folder deleted!']);
        fetchSilosHandler();
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
    },
    [fetchSilosHandler, organization],
  );

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
      isLoadingSiloFilesAttributes,
      siloFilesAttributes,
      setSelectedColumns,
      fetchSiloFilesAttributesHandler,
      selectedColumns,
      handleBulkSelectColumn,
      setFolder,
      folder,
      isLoadingSiloFileAttributes,
      fetchSiloFileAttributesHandler,
      siloFileAttributes,
      deleteSiloFolderHandler,
      setDeletingFolder,
      isDeletingFolder,
    }),
    [
      setDeletingFolder,
      isDeletingFolder,
      deleteSiloFolderHandler,
      siloFileAttributes,
      fetchSiloFileAttributesHandler,
      isLoadingSiloFileAttributes,
      folder,
      setFolder,
      handleBulkSelectColumn,
      selectedColumns,
      setSelectedColumns,
      fetchSiloFilesAttributesHandler,
      siloFilesAttributes,
      isLoadingSiloFilesAttributes,
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
    ],
  );

  return <SilosContext.Provider value={providerValue}>{children}</SilosContext.Provider>;
}

export { SiloProvider, useSilo };
