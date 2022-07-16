import "nprogress/nprogress.css";
import nprogress from "nprogress";
import { Fragment, useCallback, useEffect, useState } from "react";
import {
  Group,
  Pagination,
  Paper,
  Select,
  Stack,
  Table,
  Title,
} from "@mantine/core";
import Controls from "@/components/songs/molecules/control";
import { useSearch } from "@/hooks/use-search";
import TableHeader from "@/components/shared/molecules/table-header";
import TableBody from "@/components/shared/molecules/table-body";
import { defaultTo } from "ramda";
import { Song } from "@/types/song";
import Repeat from "@/components/shared/molecules/repeat";
import useSongListing from "@/hooks/use-song-listing";
import TableCellLoader from "@/components/shared/atoms/table-cell-loader";

const defaultEmpty = (value: string) => (value.length === 0 ? "N/A" : value);

const Songs = () => {
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const reset = useCallback(() => setPage(1), [setPage]);
  const { input, search } = useSearch(reset);
  const { data, isLoading, isFetching } = useSongListing({
    pagination: {
      page: page,
      pageSize: pageSize,
    },
    filters: {
      search,
    },
  });

  useEffect(() => {
    if (isFetching) {
      nprogress.start();
    } else {
      nprogress.done();
    }
  }, [isFetching]);

  return (
    <Fragment>
      <Stack my={"md"}>
        <Group position={"apart"}>
          <Title order={2}>歌單一覽</Title>
          <Controls search={input} />
        </Group>
        <Paper withBorder p={"sm"}>
          <Table verticalSpacing={"sm"}>
            <TableHeader headers={["歌名", "歌手", "類型"]} />
            <TableBody
              loading={isLoading}
              data={defaultTo<Song[], Song[]>([], data?.data)}
              fallback={
                <tr>
                  <Repeat occurrence={4}>
                    <TableCellLoader />
                  </Repeat>
                </tr>
              }
            >
              {(song) => (
                <tr key={song._id}>
                  <td>{song.name}</td>
                  <td>{song.artist}</td>
                  <td>{defaultEmpty(song.genres.join(", "))}</td>
                </tr>
              )}
            </TableBody>
          </Table>
        </Paper>
        <Group position={"apart"}>
          <Select
            placeholder={"頁面大小"}
            value={pageSize.toString()}
            sx={{ maxWidth: "175px" }}
            onChange={(s) => {
              if (!s) return;
              setPageSize(parseInt(s));
              setPage(1);
            }}
            data={[1, 5, 10, 15, 20, 50].map((ps) => ({
              value: ps.toString(),
              label: `${ps} 條 / 頁`,
            }))}
          />
          <Pagination
            page={page}
            onChange={setPage}
            total={defaultTo(1, data?.totalPages)}
          />
        </Group>
      </Stack>
    </Fragment>
  );
};

export default Songs;
