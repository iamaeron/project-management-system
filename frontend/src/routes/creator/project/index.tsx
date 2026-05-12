import { useFetchSingleProject } from "@/hooks/useFetchSingleProject";
import AppLayout from "@/layouts/creator/AppLayout";
import { Box, Image, Text } from "@mantine/core";
import { useParams } from "react-router";

export default function CreatorProjectPage() {
  const { projectId } = useParams();
  const { data, isFetching } = useFetchSingleProject(projectId ?? "");

  if (isFetching) {
    return (
      <AppLayout>
        <div> Loading ...</div>
      </AppLayout>
    );
  }

  console.log(data);

  return (
    <AppLayout customLastCrumb={data.project.title}>
      <Image
        w="100%"
        h={200}
        radius={14}
        src="https://meshgradient.com/gallery/2.png"
      />
      <Box px={14}>
        <Text mt={16} fz="h2" tt="capitalize" fw={600}>
          {data.project.title}
        </Text>
        <Text c="gray.7">{data.project.description}</Text>
        <Text fw={600} mt="xl">
          Tasks
        </Text>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Non pariatur
        cupiditate odit nesciunt quia nulla repellendus illo. Ad, officia
        voluptatibus. Sunt quidem quaerat temporibus. Facere sapiente nesciunt
        minus odio necessitatibus aliquam, hic excepturi suscipit deserunt cum
        saepe illum ratione sunt modi explicabo accusantium labore molestiae
        eligendi sint ex. Dolorum minus debitis dignissimos non consequatur sed
        quaerat ipsam, quae ullam in eaque expedita nemo quos, aut explicabo
        voluptate? Cumque, libero, facere voluptatem ratione pariatur eligendi
        excepturi earum voluptas doloribus sint dolorum minus error molestiae
        quis iste. Perspiciatis repellendus ad veritatis pariatur!
        Exercitationem accusantium debitis maiores officia officiis nobis
        veritatis alias sint, eaque soluta magni corporis consectetur, eius
        ipsam nemo fugiat illo id deserunt deleniti? Illum dolorum rerum eveniet
        porro alias? Quas, quia minus rerum impedit tempora magni voluptatibus
        maxime saepe quaerat eligendi dolorum officiis sint nobis perspiciatis
        numquam quod dolores unde dolorem reiciendis odio. Voluptate,
        consequatur nisi quasi dolorum quidem illo distinctio, repudiandae
        eveniet explicabo, obcaecati cumque at! Saepe dicta eveniet, perferendis
        aspernatur nesciunt quod eaque cum aliquam quaerat sunt error illum
        facilis ratione dolores assumenda vero, molestias rem. Odio atque
        repudiandae, exercitationem suscipit maiores possimus ab ullam tempore
        voluptatum dolores fuga magni ad repellendus quaerat voluptate eveniet,
        impedit quia? Esse nesciunt ratione voluptates amet cupiditate a,
        suscipit magni placeat obcaecati animi tenetur repellat quo quaerat
        reprehenderit maiores sunt quisquam necessitatibus aspernatur commodi
        minus illum aliquam excepturi repellendus. Animi sit autem praesentium,
        aspernatur est a maiores consequuntur eum molestias harum neque quisquam
        amet molestiae incidunt dolor quam esse, recusandae quo mollitia
        voluptatibus. Earum, nemo animi. Illo illum labore alias voluptate,
        natus odio sit ea! Quia voluptatum soluta reiciendis praesentium odit
        provident est quo commodi officiis et esse suscipit iure laudantium
        impedit sapiente cupiditate, sequi, minima mollitia exercitationem nisi
        laboriosam nulla tempore beatae veritatis. Temporibus maiores natus
        minus cupiditate, quia deleniti ipsa, hic perferendis distinctio quas
        quisquam et totam rerum quibusdam nostrum iusto reiciendis delectus
        illum fuga, libero repudiandae a dolorum voluptatibus. Dolores eius
        libero sit quibusdam accusantium numquam nesciunt dolorum rem!
        Asperiores, quidem perspiciatis pariatur magnam maxime fugiat, eos ut
        ipsam culpa sed accusamus obcaecati! Nesciunt voluptate totam obcaecati!
        Totam, excepturi dolorem amet ullam accusantium tempora voluptates
        similique sunt esse rerum illo odio expedita ipsa mollitia laborum culpa
        consequatur accusamus eaque cupiditate nihil. Quod laboriosam
        dignissimos repellendus cupiditate unde ex sequi ab odit asperiores
        facere quo provident quae culpa quibusdam sapiente quidem aperiam
        possimus vel, consequatur a cum veniam? Voluptates ipsa aspernatur
        officiis sapiente in culpa illum dolorem accusantium! Deleniti
        blanditiis soluta provident sapiente iure quasi autem quae adipisci
        reprehenderit, eligendi ea earum reiciendis consectetur aliquid eos
        assumenda optio recusandae sed saepe tempora laudantium, doloremque
        rerum commodi ullam. Quibusdam, aut? Odio excepturi est laboriosam
        tempora modi. Expedita, ea itaque ducimus magnam consequatur ad tempore
        maxime tempora inventore a, ipsam amet, ex nihil nulla recusandae. Quis,
        blanditiis. Nemo quam ipsam ipsum eligendi suscipit sint distinctio
        nostrum eos error ad enim, molestiae tempore saepe explicabo impedit?
        Mollitia voluptatum deserunt assumenda blanditiis animi quasi vel
        quibusdam. Dignissimos illum corporis pariatur aliquam deserunt facilis
        sit.
      </Box>
    </AppLayout>
  );
}
